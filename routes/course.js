var express = require("express");
var router = express.Router();
const controller = require("../controllers/index");
const middleware = require("../middleware/index");

router.get("", controller.CourseController.getAll);
router.get("/free-course", controller.CourseController.getAllFree);
router.get("/popular-course", controller.CourseController.getAllPopular);
router.post("/add", middleware.Auth.checkAuth, controller.CourseController.add);
router.get("/:id", controller.CourseController.getById);
router.put("/:id", middleware.Auth.checkAuth, controller.CourseController.update);
router.post("/delete/:id", middleware.Auth.checkAuth, controller.CourseController.delete);
router.post("/enroll/:id", middleware.Auth.checkAuth, controller.CourseController.enroll);

module.exports = router;