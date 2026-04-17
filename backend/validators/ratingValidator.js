const { body, param } = require("express-validator");

exports.rateProductValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5")
    .toFloat(),

  body("review")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Review too long"),

  body("reviewTitle")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Review title too long"),
];
exports.getRatingsValidator = [
  param("productId").isMongoId().withMessage("Invalid product ID"),
];
