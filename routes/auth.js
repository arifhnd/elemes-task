var express = require("express");
var router = express.Router();
const controllers = require("../controllers/index");

router.post("/login", controllers.AuthController.login);
module.exports = router;
