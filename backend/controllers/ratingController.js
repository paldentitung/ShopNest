const ratingservice = require("../services/ratingService");
exports.rateProduct = async (req, res) => {
  try {
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
      message: "Rating saved",
      avgRating: result.avgRating,
      totalRatings: result.totalRatings,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getProductRatings = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratings = await ratingservice.getProductRatings(productId);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
