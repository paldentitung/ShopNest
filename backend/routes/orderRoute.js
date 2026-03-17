const express = require("express");
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const Router = express.Router();

Router.get("/", getOrders);
Router.patch("/:id/status", updateOrderStatus);
module.exports = Router;
