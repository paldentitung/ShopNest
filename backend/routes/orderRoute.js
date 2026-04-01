const express = require("express");
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const Router = express.Router();
const asyncHandler = require("../utils/asyncHandler");

Router.get("/", auth, asyncHandler(getOrders));
Router.patch("/:id/status", auth, asyncHandler(updateOrderStatus));
module.exports = Router;
