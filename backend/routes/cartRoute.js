const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  checkout,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const Router = express.Router();

Router.get("/", auth, getCart);
Router.post("/", auth, addToCart);
Router.put("/:cartItemId", auth, updateQuantity);
Router.delete("/:cartItemId", auth, removeFromCart);

module.exports = Router;
