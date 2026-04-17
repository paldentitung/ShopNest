const router = require("express").Router();

const {
  getProductRatings,
  rateProduct,
} = require("../controllers/ratingController");

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { rateProductValidator } = require("../validators/ratingValidator");

router.get("/:productId", auth, asyncHandler(getProductRatings));

router.post(
  "/",
  auth,
  rateProductValidator,
  validate,
  asyncHandler(rateProduct),
);

module.exports = router;
