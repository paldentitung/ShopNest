const express = require("express");
const Router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  search,
} = require("../controllers/productController");

const upload = require("../middleware/upload");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");

const {
  searchValidator,
  createProductValidator,
  updateProductValidator,
  paginationValidator,
} = require("../validators/productValidator");

Router.get("/", paginationValidator, validate, asyncHandler(getAllProducts));
Router.get("/search", searchValidator, validate, asyncHandler(search));
Router.post(
  "/",
  auth,
  upload.single("image"),
  createProductValidator,
  validate,
  asyncHandler(createProduct),
);
Router.put(
  "/:id",
  auth,
  updateProductValidator,
  validate,
  upload.single("image"),
  asyncHandler(updateProduct),
);
Router.delete("/:id", auth, asyncHandler(deleteProduct));

module.exports = Router;
