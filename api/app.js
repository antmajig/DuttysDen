var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var addPlayerRouter = require("./routes/addPlayer");
var gameRouter = require("./routes/addGame");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var playerListRouter = require("./routes/playerListRoute");
var leaderBoardRouter = require("./routes/leaderBoardRoute");
var gamesRouter = require("./routes/getGame");
var playerRouter = require("./routes/playerRoute");
let resultsRouter = require("./routes/results");
let chartDataRouter = require("./routes/chartData");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json()); //For parsing json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", addPlayerRouter);
app.use("/api", gameRouter);
app.use("/api", indexRouter);
app.use("/users", usersRouter);
app.use("/api", playerListRouter);
app.use("/api", leaderBoardRouter);
app.use("/api", gamesRouter);
app.use("/api", playerRouter);
app.use("/api", resultsRouter);
app.use("/api", chartDataRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
