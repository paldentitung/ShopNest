const express = require("express");
const { addToCart, getCart } = require("../controllers/cartController");
const auth = require("../middleware/auth");
const Router = express.Router();

Router.get("/", auth, getCart);
Router.post("/", auth, addToCart);

module.exports = Router;
