const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  search,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const Router = express.Router();
const asyncHandler = require("../utils/asyncHandler");

Router.get("/", asyncHandler(getAllProduct));
Router.get("/search", asyncHandler(search));
Router.post("/", upload.single("image"), asyncHandler(createProduct));
Router.put(
  "/:id",
  upload.single("image"),

  asyncHandler(updateProduct),
);
Router.delete("/:id", asyncHandler(deleteProduct));
module.exports = Router;
