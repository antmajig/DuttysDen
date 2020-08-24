let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");

router.get("/playerlist", function (req, res, next) {
  let connection = mysql.createConnection(config.databaseOptions);
  connection.connect();

  let query = "SELECT * FROM Player";
  connection.query(query, function (err, rows) {
    if (err) {
    } else {
      res.send(rows);
    }
  });
});

router.get("/season", function (req, res, next) {
  let connection = mysql.createConnection(config.databaseOptions);
  let query = "SELECT * FROM Season";
  connection.query(query, function (err, rows) {
    if (err) {
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
