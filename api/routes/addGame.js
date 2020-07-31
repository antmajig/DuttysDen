let express = require("express");
let router = express.Router();
let mysql = require("mysql");
const { json } = require("express");

function specialCases(results) {
  const numberOfPlayers = results.length;
  if (numberOfPlayers === 5) {
    results[0].points = 3;
    return true;
  }
  if (numberOfPlayers === 4) {
    results[0].points = 2;
    return true;
  }
  return false;
}

function calculatePoints(results) {
  if (specialCases(results)) {
    return;
  }
  const numberOfPlayers = results.length;
  const p = Math.round(0.34 * numberOfPlayers);
  let divideConst = 0;
  for (i = 0; i < p; i++) {
    divideConst += Math.sqrt(numberOfPlayers) / Math.sqrt(i + 1);
  }

  let totalPoints = 0;
  for (i = 0; i < p; i++) {
    results[i].points =
      (numberOfPlayers * (Math.sqrt(numberOfPlayers) / Math.sqrt(i + 1))) /
      divideConst;

    totalPoints += results[i].points;
  }

  for (i = 0; i < p; i++) {
    results[i].points = (
      numberOfPlayers *
      (results[i].points / totalPoints)
    ).toFixed(2);
  }
}

router.post("/add-game", function (req, res) {
  console.log(req.body.title);
  console.log("POST SUCCESS");
});

module.exports = router;
