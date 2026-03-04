const express = require("express");
const { addToCart } = require("../controllers/cartController");
const auth = require("../middleware/auth");
const Router = express.Router();

Router.post("/", auth, addToCart);

module.exports = Router;
