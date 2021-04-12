let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");
const { json } = require("express");
const sqlFunctions = require("./sqlFunctions.js");

function comparePlayers(a, b) {
  const pointsA = a.Points;
  const pointsB = b.Points;
  let comp = 0;
  if (pointsA > pointsB) {
    comp = -1;
  } else if (pointsA < pointsB) {
    comp = 1;
  }
  return comp;
}

router.get("/leaderboard/:seasonID", async function (req, res, next) {
  const seasonID = Number(req.params.seasonID);
  const gamesInSeason = "SELECT GameID FROM Game WHERE SeasonId = ?";
  const resultsFromSeason = "SELECT * FROM Result WHERE GameId IN (?)";
  let leaderboard = [];

  const gameResults = await sqlFunctions
    .sqlQuery(gamesInSeason, seasonID)
    .catch((error) => {
      next(error);
    });

  if (!gameResults.success || gameResults.rows.length === 0) {
    return res.send(leaderboard);
  }
  let gameIDs = [];
  gameResults.rows.map((game) => {
    gameIDs.push(game.GameID);
  });

  const results = await sqlFunctions
    .sqlQuery(resultsFromSeason, [gameIDs])
    .catch((error) => {
      next(error);
    });

  results.rows.map((result) => {
    let pExists = leaderboard.filter((p) => result.PlayerID === p.PlayerID);

    if (pExists.length == 1) {
      pExists[0].Points += result.Points;
      pExists[0].GamesPlayed++;
    } else {
      let entry = {
        PlayerID: result.PlayerID,
        Points: result.Points,
        GamesPlayed: 1,
      };
      leaderboard.push(entry);
    }
  });

  const playerQuery = "SELECT * FROM Player";
  const players = await sqlFunctions.sqlQuery(playerQuery).catch((error) => {
    next(error);
  });

  leaderboard.map((leadEntry) => {
    let playerName = players.rows.filter(
      (p) => leadEntry.PlayerID === p.PlayerID
    );
    leadEntry.PlayerName = playerName[0].PlayerName;
  });

  res.send(leaderboard.sort(comparePlayers));
});

module.exports = router;
