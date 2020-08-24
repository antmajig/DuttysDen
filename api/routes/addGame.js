let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");

function specialCases(results) {
  const numberOfPlayers = results.length;
  if (numberOfPlayers === 5) {
    results[0].points = 3;
    return true;
  }
  if (numberOfPlayers === 4) {
    results[0].points = 2;
    return true;
  }
  if (numberOfPlayers < 4) {
    results[0].points = 0;
    return true;
  }
  return false;
}

function calculatePoints(results) {
  if (specialCases(results)) {
    return;
  }
  const numberOfPlayers = results.length;
  const p = Math.floor(0.34 * numberOfPlayers);
  let divideConst = 0;
  for (i = 0; i < p; i++) {
    divideConst += Math.sqrt(numberOfPlayers) / Math.sqrt(i + 1);
  }

  let totalPoints = 0;
  for (i = 0; i < p; i++) {
    results[i].points =
      (numberOfPlayers * (Math.sqrt(numberOfPlayers) / Math.sqrt(i + 1))) /
      divideConst;

    totalPoints += results[i].points;
  }

  for (i = 0; i < p; i++) {
    results[i].points = (
      numberOfPlayers *
      (results[i].points / totalPoints)
    ).toFixed(2);
  }
}

router.post("/add-game", async function (req, res) {
  const connection = mysql.createConnection(config.databaseOptions);
  connection.connect();

  let resultObject = {
    error: null,
    success: false,
  };

  const insertGameQuery =
    "INSERT INTO Game (SeasonID, GameName, GameType, Date) VALUES (?,?,?,?)";
  const gameValues = [
    req.body.season,
    req.body.gameName,
    req.body.gameType,
    req.body.gameDate,
  ];
  let gamePromise = await new Promise((result, rejection) => {
    connection.query(insertGameQuery, gameValues, function (error, rows) {
      if (error) {
        rejection(error);
      }
      result(rows.insertId);
    });
  }).catch((error) => {
    resultObject.error = error;
    resultObject.success = false;
  });

  if (resultObject.error) {
    return res.send(JSON.stringify(resultObject));
  }

  if (req.body.points) {
    calculatePoints(req.body.rowData);
  }
  const insertResultQuery =
    "INSERT INTO Result (PlayerID, GameID, Position, Points,Cash, BountyCash) VALUES ?";
  resultValues = [];
  for (i = 0; i < req.body.rowData.length; i++) {
    valueItem = [
      req.body.rowData[i].PlayerID,
      gamePromise,
      i,
      req.body.rowData[i].points,
      req.body.rowData[i].cash,
      req.body.rowData[i].bountyCash,
    ];
    resultValues.push(valueItem);
  }

  let resultPromise = await new Promise((result, rejection) => {
    connection.query(insertResultQuery, [resultValues], function (error) {
      if (error) {
        rejection(error);
      }
      result(true);
    });
  }).catch((error) => {
    resultObject.error = error;
    resultObject.success = false;
  });

  if (!resultObject.error) {
    resultObject.success = true;
  }
  return res.send(resultObject);
});

module.exports = router;
