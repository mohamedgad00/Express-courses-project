const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required and should be minimum 3 characters")
      .isLength({ min: 3 }),
    body("price")
      .notEmpty()
      .withMessage("Price is required and should be a number")
      .isNumeric(),
  ];
};

module.exports = validationSchema;
