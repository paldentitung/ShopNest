const { body, param } = require("express-validator");

exports.addToCartValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

exports.updateQuantityValidator = [
  param("cartItemId").isMongoId().withMessage("Invalid cart item ID"),

  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

exports.removeFromCartValidator = [
  param("cartItemId").isMongoId().withMessage("Invalid cart item ID"),
];
