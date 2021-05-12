let express = require("express");
let router = express.Router();
const sqlFunctions = require("./sqlFunctions.js");

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
  for (let i = 0; i < p; i++) {
    divideConst += Math.sqrt(numberOfPlayers) / Math.sqrt(i + 1);
  }

  let totalPoints = 0;
  for (let i = 0; i < p; i++) {
    results[i].points =
      (numberOfPlayers * (Math.sqrt(numberOfPlayers) / Math.sqrt(i + 1))) /
      divideConst;

    totalPoints += results[i].points;
  }

  for (let i = 0; i < p; i++) {
    results[i].points = (
      numberOfPlayers *
      (results[i].points / totalPoints)
    ).toFixed(2);
  }
}

router.post("/add-game", async function (req, res) {
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
  let gamePromise = await sqlFunctions.sqlQuery(insertGameQuery, gameValues);

  if (gamePromise.error) {
    resultObject.success = false;
    resultObject.error = gamePromise.error;
    return res.send(JSON.stringify(resultObject));
  }

  if (req.body.points) {
    calculatePoints(req.body.rowData);
  }
  const insertResultQuery =
    "INSERT INTO Result (PlayerID, GameID, Position, Points,Cash, BountyCash) VALUES ?";
  let resultValues = [];
  for (let i = 0; i < req.body.rowData.length; i++) {
    let valueItem = [
      req.body.rowData[i].PlayerID,
      gamePromise.rows.insertId,
      i,
      req.body.rowData[i].points,
      req.body.rowData[i].cash,
      req.body.rowData[i].bountyCash,
    ];
    resultValues.push(valueItem);
  }
  let resultPromise = await sqlFunctions.sqlQuery(insertResultQuery, [
    resultValues,
  ]);

  if (resultPromise.error) {
    resultObject.success = false;
    resultObject.error = resultPromise.error;
  }
  if (!resultObject.error) {
    resultObject.success = true;
  }
  return res.send(resultObject);
});

module.exports = router;
