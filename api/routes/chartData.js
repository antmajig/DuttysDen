let express = require("express");
let router = express.Router();
const sqlFunctions = require("./sqlFunctions.js");

router.get("/chartData/season/:seasonId", async function (req, res, next) {
  //get players which have played this season
  //get all games this season
  const seasonId = Number(req.params.seasonId);
  const seasonGamesQ = "SELECT * FROM Game WHERE SeasonID = ?";
  let seasonGames = await sqlFunctions
    .sqlQuery(seasonGamesQ, seasonId)
    .catch((next) => {
      next(error);
    });
  seasonGames = seasonGames.rows;
  seasonGameIds = [];
  for (game of seasonGames) {
    seasonGameIds.push(game.GameID);
  }
  const playersQ = "SELECT * FROM Player";
  let players = await sqlFunctions.sqlQuery(playersQ).catch((next) => {
    next(error);
  });
  players = players.rows;

  resultObject = {
    chartData: new Array(seasonGameIds.length + 2),
  };
  createXAxisArray(resultObject.chartData, seasonGameIds.length);
  for (player of players) {
    tempDataArray = [];
    tempDataArray.push(player.PlayerName);
    tempDataArray.push(0);

    const binds = [];
    binds.push(player.PlayerID);
    binds.push(seasonGameIds);
    const playerResultsQ =
      "SELECT * FROM Result WHERE PlayerID = ? AND GameID IN (?)";
    let playerResults = await sqlFunctions
      .sqlQuery(playerResultsQ, binds)
      .catch((error) => next(error));
    playerResults = playerResults.rows;
    let gameIdx = 2;
    for (game of seasonGames) {
      const found = playerResults.find((ele) => ele.GameID == game.GameID);
      if (found != undefined) {
        tempDataArray.push(
          Number(tempDataArray[gameIdx - 1]) + Number(found.Points)
        );
      } else {
        tempDataArray.push(tempDataArray[gameIdx - 1]);
      }
      gameIdx++;
    }

    if (tempDataArray[gameIdx - 1] > 0) {
      mergeChartDataArray(resultObject.chartData, tempDataArray);
    }
  }
  res.send(resultObject);
});
function createXAxisArray(masterArray, numberOfGames) {
  let xAxisArray = [];
  xAxisArray.push("x");
  for (i = 0; i <= numberOfGames; i++) {
    xAxisArray.push(String(i));
  }
  mergeChartDataArray(masterArray, xAxisArray);
}
function mergeChartDataArray(masterArray, childArray) {
  for (i = 0; i < masterArray.length; i++) {
    if (masterArray[i] == undefined) {
      masterArray[i] = [];
    }
    masterArray[i].push(childArray[i]);
  }
}
module.exports = router;
