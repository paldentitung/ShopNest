const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const {
  addToCartValidator,
  updateQuantityValidator,
  removeFromCartValidator,
} = require("../validators/cartValidator");
const validate = require("../middleware/validate");
const Router = express.Router();

Router.get("/", auth, asyncHandler(getCart));
Router.post("/", auth, addToCartValidator, validate, asyncHandler(addToCart));
Router.put(
  "/:cartItemId",
  auth,
  updateQuantityValidator,
  validate,
  asyncHandler(updateQuantity),
);
Router.delete(
  "/:cartItemId",
  auth,
  removeFromCartValidator,
  validate,
  asyncHandler(removeFromCart),
);

module.exports = Router;
