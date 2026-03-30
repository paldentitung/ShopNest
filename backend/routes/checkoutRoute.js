const express = require("express");

const auth = require("../middleware/auth");
const { checkout } = require("../controllers/checkoutController");
const asyncHandler = require("../utils/asyncHandler");

const Router = express.Router();

Router.post("/", auth, asyncHandler(checkout));

module.exports = Router;
