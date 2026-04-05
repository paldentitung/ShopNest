const express = require("express");
const {
  getOrders,
  updateOrderStatus,
  getPurchaseHistory,
  getMyInProgressOrders,
  getMyOrder,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const Router = express.Router();
const asyncHandler = require("../utils/asyncHandler");

Router.get("/", auth, asyncHandler(getOrders));
Router.get("/myorder", auth, asyncHandler(getMyOrder));
Router.get("/getpurchasehistory", auth, asyncHandler(getPurchaseHistory));
Router.get("/getmyinprogressorders", auth, asyncHandler(getMyInProgressOrders));

Router.patch("/:id/status", auth, asyncHandler(updateOrderStatus));
module.exports = Router;
