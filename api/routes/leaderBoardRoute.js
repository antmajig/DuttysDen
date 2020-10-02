let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");
const { json } = require("express");

router.get("/leaderboard/:seasonID", async function (req, res, next) {
  const connection = mysql.createConnection(config.databaseOptions);
  connection.connect();
  const seasonID = Number(req.params.seasonID);

  const gamesInSeason = "SELECT GameID FROM Game WHERE SeasonId = ?";
  let resultsFromSeason = "SELECT * FROM Result WHERE GameId IN (";
  const playerQuery = "SELECT * FROM Player";
  let gamePromise = await new Promise((result, reject) => {
    connection.query(gamesInSeason, seasonID, function (error, gameIds) {
      if (error) {
        reject(error);
      }
      const numberOfGames = gameIds.length;
      gameIds.map((gameId, i) => {
        resultsFromSeason += gameId.GameID;
        if (i + 1 != numberOfGames) {
          resultsFromSeason += ",";
        }
      });
      resultsFromSeason += ")";
      result(gameIds);
    });
  });

  let resultPromise = await new Promise((result, reject) => {
    connection.query(resultsFromSeason, function (error, results) {
      if (error) {
        reject(error);
      }
      result(results);
    });
  });

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

  let leaderboard = [];
  resultPromise.map((result) => {
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

  let playerPromise = await new Promise((res, rej) => {
    connection.query(playerQuery, function (error, players) {
      if (error) {
        rej(error);
      }
      res(players);
    });
  });
  leaderboard.map((leadEntry) => {
    let playerName = playerPromise.filter(
      (p) => leadEntry.PlayerID === p.PlayerID
    );
    leadEntry.PlayerName = playerName[0].PlayerName;
  });

  res.send(leaderboard.sort(comparePlayers));
});

module.exports = router;
