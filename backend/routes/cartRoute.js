const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const Router = express.Router();

Router.get("/", auth, asyncHandler(getCart));
Router.post("/", auth, asyncHandler(addToCart));
Router.put("/:cartItemId", auth, asyncHandler(updateQuantity));
Router.delete("/:cartItemId", auth, asyncHandler(removeFromCart));

module.exports = Router;
