let express = require("express");
let router = express.Router();
let mysql = require("mysql");

router.post("/add-player", async function (req, res) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "astro",
    password: "password",
    database: "DuttysDen",
  });
  connection.connect();

  let playerPromise = await new Promise((result, rejection) => {
    connection.query(
      "INSERT INTO Player (PlayerName, Location, RealName) VALUES (?,?,?)",
      [req.body.username, req.body.location, req.body.realname],
      function (error) {
        if (error) {
          rejection(error);
        }
        result("success");
      }
    );
  }).catch((error) => {
    res.send({
      outcome: false,
    });
  });

  if (playerPromise === "success") {
    res.send({
      outcome: true,
    });
  }
});
module.exports = router;
