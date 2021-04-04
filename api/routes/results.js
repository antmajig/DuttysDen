let express = require("express");
let router = express.Router();
const sqlFunctions = require("./sqlFunctions.js");

router.get(
  "/results/player/:playerId/season/:seasonId",
  async function (req, res, next) {
    let resultsObject = {
      resultData: [],
    };
    let playerId = Number(req.params.playerId);
    let seasonId = Number(req.params.seasonId);

    const seasonGamesQ = "SELECT GameID FROM Game WHERE SeasonId = ?";
    let seasonGames = await sqlFunctions
      .sqlQuery(seasonGamesQ, seasonId)
      .catch((error) => {
        next(error);
      });

    seasonGames = seasonGames.rows;
    let tempGameList = [];
    for (let gameID of seasonGames) {
      tempGameList.push(gameID.GameID);
    }
    seasonGames = tempGameList;

    binds = [];
    binds.push(playerId);
    binds.push(seasonGames);

    const joinedListQ =
      "SELECT * FROM Result WHERE PlayerID = ? AND GameID IN (?)";
    let joinedList = await sqlFunctions
      .sqlQuery(joinedListQ, binds)
      .catch((error) => {
        next(error);
      });

    resultsObject.resultData = joinedList.rows;
    res.send(resultsObject);
  }
);

module.exports = router;
