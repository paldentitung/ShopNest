const Router = require("express").Router();
const {
  getProductRatings,
  rateProduct,
} = require("../controllers/ratingController");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

Router.get("/:productId", auth, asyncHandler(getProductRatings));
Router.post("/", auth, asyncHandler(rateProduct));

module.exports = Router;
