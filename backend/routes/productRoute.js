const express = require("express");
const {
  getAllProduct,
  createProduct,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const Router = express.Router();

Router.get("/", getAllProduct);
Router.post("/", upload.single("image"), createProduct);
module.exports = Router;
