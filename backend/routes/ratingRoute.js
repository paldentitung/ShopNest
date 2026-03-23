const Router = require("express").Router();
const {
  getProductRatings,
  rateProduct,
} = require("../controllers/ratingController");
const auth = require("../middleware/auth");
Router.get("/:productId", auth, getProductRatings);
Router.post("/", auth, rateProduct);

module.exports = Router;
