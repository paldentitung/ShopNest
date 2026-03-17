const express = require("express");
const { getOrders } = require("../controllers/orderController");
const Router = express.Router();

Router.get("/", getOrders);

module.exports = Router;
