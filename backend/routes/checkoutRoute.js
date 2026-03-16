const express = require("express");

const auth = require("../middleware/auth");
const { checkout } = require("../controllers/checkoutController");
const Router = express.Router();

Router.post("/", auth, checkout);

module.exports = Router;
