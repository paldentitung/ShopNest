const { body, param, query } = require("express-validator");

exports.createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("category").notEmpty().withMessage("Category is required").trim(),

  body("priceCents")
    .notEmpty()
    .withMessage("Price is required")
    .isInt({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description too short"),

  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be >= 0"),

  body("variations")
    .optional()
    .isArray()
    .withMessage("Variations must be an array"),
];
exports.updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),

  body("name").optional().isLength({ min: 3 }).withMessage("Name too short"),

  body("priceCents")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Price must be >= 0"),

  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be >= 0"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),
];
exports.searchValidator = [
  query("query")
    .optional()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Search query must be valid"),
];
exports.paginationValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];
