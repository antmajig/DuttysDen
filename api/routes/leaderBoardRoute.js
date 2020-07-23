var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const { json } = require("express");

router.get("/leaderboard", async function (req, res, next) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "astro",
    password: "password",
    database: "DuttysDen",
  });
  connection.connect();

  const gamesInSeason = "SELECT GameID FROM Game WHERE SeasonId = 4";
  let resultsFromSeason = "SELECT * FROM Result WHERE GameId IN (";
  const playerQuery = "SELECT * FROM Player";
  let gamePromise = await new Promise((res, rej) => {
    connection.query(gamesInSeason, function (error, gameIds) {
      if (error) {
        console.log("Error gettings games in season");
        rej(error);
      }
      const numberOfGames = gameIds.length;
      gameIds.map((gameId, i) => {
        resultsFromSeason += gameId.GameID;
        if (i + 1 != numberOfGames) {
          resultsFromSeason += ",";
        }
      });
      resultsFromSeason += ")";
      res(gameIds);
    });
  });

  let resultPromise = await new Promise((res, rej) => {
    connection.query(resultsFromSeason, function (error, results) {
      if (error) {
        console.log("Error gettings results in season");
        rej(error);
      }
      res(results);
    });
  });

  let leaderboard = [];
  resultPromise.map((result) => {
    var pExists = leaderboard.filter((p) => result.PlayerID === p.PlayerID);

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
    var playerName = playerPromise.filter(
      (p) => leadEntry.PlayerID === p.PlayerID
    );
    leadEntry.PlayerID = playerName[0].PlayerName;
  });
  res.send(leaderboard);
});

module.exports = router;
