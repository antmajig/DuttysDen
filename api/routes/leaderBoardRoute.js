var express = require('express')
var router = express.Router();
var mysql = require('mysql');
const { json } = require('express');

router.get('/leaderboard', async function (req, res, next) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'astro',
        password: 'password',
        database: 'DuttysDen'
    });
    connection.connect();
    
    const gamesInSeason = "SELECT GameID FROM Game WHERE SeasonId = 4"
    let resultsFromSeason = "SELECT * FROM Results WHERE GameId IN ("

    connection.query(gamesInSeason, function (error, gameIds) {
        resultsFromSeason += "kk";
        if (error) {
            console.log("Error gettings games in season");
        }
        gameIds.map(gameId => {
            resultsFromSeason += gameId.GameID + ',';
            console.log(gameId.GameID);
        });
        resultsFromSeason += ")";
        console.log(resultsFromSeason);
    });
});

module.exports = router;