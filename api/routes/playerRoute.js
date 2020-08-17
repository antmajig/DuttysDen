let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let config = require("../config/config.js");

router.get("/player/:playerid", async function (req, res, next) {
  let connection = mysql.createConnection(config.databaseOptions);
  connection.connect();
  let resultObject = {
    playerData: [],
    resultData: [],
  };
  const playerQuery = "SELECT * FROM Player WHERE PlayerID = ?";
  const playerID = Number(req.params.playerid);

  let playerPromise = await new Promise((result, rejection) => {
    connection.query(playerQuery, playerID, function (error, rows) {
      if (error) {
        console.log("error thrown");
        rejection();
      } else {
        resultObject.playerData.push(rows);
        result();
      }
    });
  });

  const resultsQuery = "SELECT * FROM Result WHERE PlayerID = ?";
  let resultsPromise = await new Promise((result, rejection) => {
    connection.query(resultsQuery, playerID, function (error, rows) {
      if (error) {
        console.log("error thrown");
        rejection();
      } else {
        resultObject.resultData.push(rows);
        result();
      }
    });
  });

  console.log("done");
  res.send(resultObject);
});

module.exports = router;
