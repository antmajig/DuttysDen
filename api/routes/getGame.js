let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");

router.get("/games/:seasonID", function (req, res, next) {
  const connection = mysql.createConnection(config.databaseOptions);
  connection.connect();

  const seasonID = Number(req.params.seasonID);
  const getGamesQuery = "SELECT *  FROM Game WHERE SeasonID = ?";

  connection.query(getGamesQuery, seasonID, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
});

router.get("/game/:gameID", async function (req, res, next) {
  const connection = mysql.createConnection(config.databaseOptions);
  connection.connect();

  const gameID = Number(req.params.gameID);
  const getGameQuery = "SELECT * FROM Game WHERE GameID = ?";
  const getResultsQuery = "SELECT * FROM Result WHERE GameID = ?";
  let resultObject = {
    success: false,
    gameData: [],
    resultData: [],
  };
  const gamePromise = await new Promise((result, rejection) => {
    connection.query(getGameQuery, gameID, function (error, rows) {
      if (error) {
        console.log(error);
        rejection(error);
      } else {
        resultObject.success = true;
        resultObject.gameData = rows;
        result(resultObject);
      }
    });
  });

  const resultsPromise = await new Promise((result, rejection) => {
    connection.query(getResultsQuery, gameID, function (error, rows) {
      if (error) {
        console.log(error);
        rejection(error);
      } else {
        resultObject.success = true;
        resultObject.resultData = rows;
        result(resultObject);
      }
    });
  });

  res.send(resultObject);
});
module.exports = router;
