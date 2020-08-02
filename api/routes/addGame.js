let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");
const { json } = require("express");

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
  return false;
}

function calculatePoints(results) {
  if (specialCases(results)) {
    return;
  }
  const numberOfPlayers = results.length;
  const p = Math.round(0.34 * numberOfPlayers);
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

  const insertGameQuery =
    "INSERT INTO Game (SeasonID, GameName, GameType, Date) VALUES (?,?,?,?)";
  const gameValues = [
    req.body.season,
    req.body.gameName,
    req.body.gameType,
    req.body.gameDate,
  ];

  let gamePromise = await new Promise((result, rejection) => {
    connection.query(insertGameQuery, gameValues, function (
      error,
      rows,
      fields
    ) {
      if (error) {
        rejection(error);
      }
      result(rows.insertId);
    });
  }).catch((error) => {
    res.send({
      outcome: false,
    });
  });

  //need to get the gameID
  let resultPromise = await new Promise((result, rejection) => {
    connection.query(
      "INSERT INTO Result (PlayerID, GameID, Position, Points,Cash, BountyCash) VALUES (?,?,?,?,?,?)",
      [1, gamePromise, req.body.gameType, req.body.gameDate],
      function (error, rows, fields) {
        if (error) {
          rejection(error);
        }
        result(rows.insertId);
      }
    );
  }).catch((error) => {
    res.send({
      outcome: false,
    });
  });
  res.send(gamePromise);
});

module.exports = router;
