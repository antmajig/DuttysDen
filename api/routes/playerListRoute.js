let express = require("express");
let router = express.Router();
let mysql = require("mysql");

router.get("/playerlist", function (req, res, next) {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "astro",
    password: "password",
    database: "DuttysDen",
  });
  connection.connect();

  let query = "SELECT * FROM Player";
  connection.query(query, function (err, rows) {
    if (err) {
      console.log("error thrown");
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
