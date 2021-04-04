let express = require("express");
let router = express.Router();
const sqlFunctions = require("./sqlFunctions.js");

router.get("/player/:playerid", async function (req, res, next) {
  let resultObject = {
    playerData: [],
    resultData: [],
    seasonWins: [],
  };
  const playerQuery = "SELECT * FROM Player WHERE PlayerID = ?";
  const playerID = Number(req.params.playerid);

  let player = await sqlFunctions
    .sqlQuery(playerQuery, playerID)
    .catch((error) => {
      next(error);
    });

  const resultsQuery = "SELECT * FROM Result WHERE PlayerID = ?";
  let results = await sqlFunctions
    .sqlQuery(resultsQuery, playerID)
    .catch((error) => {
      next(error);
    });

  const seasonWinsQuery = "SELECT * FROM Season WHERE SeasonWinner = ?";
  let seasonWins = await sqlFunctions
    .sqlQuery(seasonWinsQuery, playerID)
    .catch((error) => {
      next(error);
    });

  resultObject.playerData = player.rows;
  resultObject.resultData = results.rows;
  resultObject.seasonWins = seasonWins.rows;

  res.send(resultObject);
});

module.exports = router;
