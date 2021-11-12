var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var authRouter = require("./routes/auth");
var courseRouter = require('./routes/course');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/user", usersRouter);
app.use("/auth", authRouter);
app.use("/course", courseRouter);

module.exports = app;
