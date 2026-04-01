const ratingservice = require("../services/ratingService");

exports.rateProduct = async (req, res) => {
  const { productId, rating, review, reviewTitle } = req.body;
  const userId = req.user.id;

  const result = await ratingservice.rateProduct(
    userId,
    productId,
    rating,
    review,
    reviewTitle,
  );

  res.status(200).json({
    success: true,
    message: "Rating saved",
    avgRating: result.avgRating,
    totalRatings: result.totalRatings,
  });
};

exports.getProductRatings = async (req, res) => {
  const { productId } = req.params;

  const ratings = await ratingservice.getProductRatings(productId);
  res.status(200).json({
    success: true,
    message: "Rating fetched successfully",
    data: ratings,
  });
};
