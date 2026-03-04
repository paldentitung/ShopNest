const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const Router = express.Router();

Router.get("/", auth, getCart);
Router.post("/", auth, addToCart);
Router.put("/", auth, updateQuantity);
Router.delete("/:id", auth, removeFromCart);

module.exports = Router;
