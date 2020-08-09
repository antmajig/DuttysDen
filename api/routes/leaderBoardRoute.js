let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");
const { json } = require("express");

router.get("/leaderboard", async function (req, res, next) {
  const connection = mysql.createConnection(config.databaseOptions);
  connection.connect();

  const gamesInSeason = "SELECT GameID FROM Game WHERE SeasonId = 5";
  let resultsFromSeason = "SELECT * FROM Result WHERE GameId IN (";
  const playerQuery = "SELECT * FROM Player";
  let gamePromise = await new Promise((result, reject) => {
    connection.query(gamesInSeason, function (error, gameIds) {
      if (error) {
        console.log("Error gettings games in season");
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
        console.log("Error gettings results in season");
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
        console.log("Error getting players");
        rej(error);
      }
      res(players);
    });
  });
  leaderboard.map((leadEntry) => {
    let playerName = playerPromise.filter(
      (p) => leadEntry.PlayerID === p.PlayerID
    );
    leadEntry.PlayerID = playerName[0].PlayerName;
  });

  res.send(leaderboard.sort(comparePlayers));
});

module.exports = router;
