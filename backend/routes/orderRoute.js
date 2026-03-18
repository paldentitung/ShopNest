const express = require("express");
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const Router = express.Router();

Router.get("/", auth, getOrders);
Router.patch("/:id/status", auth, updateOrderStatus);
module.exports = Router;
