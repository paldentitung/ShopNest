const express = require("express");
const {
  getAllProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const Router = express.Router();

Router.get("/", getAllProduct);
Router.post("/", upload.single("image"), createProduct);
Router.delete("/:id", deleteProduct);
module.exports = Router;
