const { body } = require("express-validator");
const { param } = require("express-validator");

exports.updateProfileValidator = [
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 2 })
    .withMessage("Username too short"),

  body("email").optional().isEmail().withMessage("Invalid email"),

  body("phone")
    .optional()
    .isString()
    .isLength({ min: 7, max: 15 })
    .withMessage("Invalid phone number"),

  body("address").optional().isString().withMessage("Address must be string"),

  body("avatar")
    .optional()
    .isString()
    .withMessage("Avatar must be a URL or string"),
];

exports.blockUserValidator = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
];
exports.unblockUserValidator = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
];

exports.getUserValidator = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
];
