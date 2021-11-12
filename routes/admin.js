var express = require("express");
var router = express.Router();
const controller = require("../controllers/index");
const middleware = require("../middleware/index");

// Get All User
router.get("/users", middleware.Auth.checkAuth, controller.UserController.getAll);
// Delete user
router.post("/delete/user/:id", middleware.Auth.checkAuth, controller.UserController.delete);
// Get Statistic Course
router.get("/course-statistic", middleware.Auth.checkAuth, controller.CourseController.getStatistic);
module.exports = router;
