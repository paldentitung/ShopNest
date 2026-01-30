const express = require("express");
const { getAllProduct } = require("../controllers/productController");
const Router = express.Router();

Router.get("/", getAllProduct);

module.exports = Router;
