var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");

var flash = require("connect-flash");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const CONSTANTS = require("./config/constants");
mongoose.Promise = global.Promise;
mongoose
  .connect(CONSTANTS.MONGO_URL, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    useMongoClient: true
  })
  .then(
    () => console.log("ket noi thanh cong"),
    err => console.log(err.message)
  );

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: CONSTANTS.SECRET_KEY,
    resave: true,
    key: "user",
    // cookie: { maxAge: 60000 },
    saveUninitialized: true
  })
);

app.use(flash());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
