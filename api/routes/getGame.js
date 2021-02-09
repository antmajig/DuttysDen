let express = require("express");
let router = express.Router();
const sqlFunctions = require("./sqlFunctions.js");

router.get("/games/:seasonID", async function (req, res) {
  const seasonID = Number(req.params.seasonID);
  const getGamesQuery = "SELECT *  FROM Game WHERE SeasonID = ?";

  let games = await sqlFunctions
    .sqlQuery(getGamesQuery, seasonID)
    .catch((error) => {
      throw error;
    });
  res.send(games.rows);
});

router.get("/games", async function (req, res) {
  const getGamesQuery = "SELECT * FROM Game";

  let games = await sqlFunctions.sqlQuery(getGamesQuery).catch((error) => {
    throw error;
  });
  res.send(games.rows);
});

router.get("/game/:gameID", async function (req, res, next) {
  const gameID = Number(req.params.gameID);
  const getGameQuery = "SELECT * FROM Game WHERE GameID = ?";
  const getResultsQuery = "SELECT * FROM Result WHERE GameID = ?";
  let resultObject = {
    success: false,
    gameData: [],
    resultData: [],
    error: null,
  };

  let game = await sqlFunctions
    .sqlQuery(getGameQuery, gameID)
    .catch((error) => {
      next(error);
    });

  if (game.error) {
    resultObject.error = game.error;
    res.json(resultObject);
    return;
  }
  let results = await sqlFunctions
    .sqlQuery(getResultsQuery, gameID)
    .catch((error) => {
      throw error;
    });
  if (results.error) {
    resultObject.error = results.error;
    res.json(resultObject);
    return;
  }
  resultObject.gameData = game.rows;
  resultObject.resultData = results.rows;
  resultObject.success = true;
  res.json(resultObject);
});
module.exports = router;
