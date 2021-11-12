var express = require("express");
var router = express.Router();
const controllers = require("../controllers/index");

router.post("/register", controllers.AuthController.register);
module.exports = router;
