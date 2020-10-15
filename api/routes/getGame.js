let express = require("express");
let router = express.Router();
const sqlFunctions = require("./sqlFunctions.js");

router.get("/games/:seasonID", async function (req, res) {
  const seasonID = Number(req.params.seasonID);
  const getGamesQuery = "SELECT *  FROM Game WHERE SeasonID = ?";

  let games = await sqlFunctions.sqlQuery(getGamesQuery, seasonID);
  res.send(games.rows);
});

router.get("/games", async function (req, res) {
  const getGamesQuery = "SELECT * FROM Game";

  let games = await sqlFunctions.sqlQuery(getGamesQuery);
  res.send(games.rows);
});

router.get("/game/:gameID", async function (req, res) {
  const gameID = Number(req.params.gameID);
  const getGameQuery = "SELECT * FROM Game WHERE GameID = ?";
  const getResultsQuery = "SELECT * FROM Result WHERE GameID = ?";
  let resultObject = {
    success: false,
    gameData: [],
    resultData: [],
    error: null,
  };

  let game = await sqlFunctions.sqlQuery(getGameQuery, gameID);
  if (game.error) {
    resultObject.error = game.error;
    res.json(resultObject);
  }
  let results = await sqlFunctions.sqlQuery(getResultsQuery, gameID);
  if (results.error) {
    resultObject.error = results.error;
    res.json(resultObject);
  }
  resultObject.gameData = game.rows;
  resultObject.resultData = results.rows;
  resultObject.success = true;
  res.json(resultObject);
});
module.exports = router;
