var express = require('express')
var router = express.Router();
var mysql = require('mysql');

router.get('/playerlist', function (req, res, next) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'astro',
        password: 'password',
        database: 'DuttysDen'
    });
    connection.connect();

    var query = "SELECT * FROM Player";
    connection.query(query, function (err, rows) {
        if (err) {
            console.log("error thrown")
        }
        else {
            res.send(rows);
        }
    });
});

module.exports = router;