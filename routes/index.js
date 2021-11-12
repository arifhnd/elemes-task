var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Welcome to Online Learning Platform" });
});

module.exports = router;
