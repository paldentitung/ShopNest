const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");
const Router = express.Router();

Router.get("/", auth, getCart);
Router.post("/", auth, addToCart);
Router.delete("/:id", auth, removeFromCart);

module.exports = Router;
