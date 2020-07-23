let express = require("express");
let router = express.Router();
let mysql = require("mysql");
const { json } = require("express");

router.post("/add-game", function (req, res) {
  console.log(req.body.title);
  console.log("POST SUCCESS");
});

module.exports = router;
