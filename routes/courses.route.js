const express = require("express");
const validationSchema = require("../middlewares/validationSchema");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();
const coursesController = require("../controllers/courses.controller");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/userRoles");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    verifyToken,
    allowedTo(userRoles.MANAGER),
    validationSchema(),
    coursesController.addCourse
  );

router
  .route("/:courseId")
  .get(coursesController.getCourseById)
  .patch(coursesController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    coursesController.deleteCourse
  );

module.exports = router;
