const Product = require("../models/Product");
const Rating = require("../models/Rating");
const mongoose = require("mongoose");

exports.rateProduct = async (req, res) => {
  try {
    const { productId, rating, review, reviewTitle } = req.body;
    const userId = req.user.id;

    let existing = await Rating.findOne({ userId, productId });

    if (existing) {
      existing.rating = rating;
      existing.review = review || "";
      existing.reviewTitle = reviewTitle || "";
      await existing.save();
    } else {
      await Rating.create({
        userId,
        productId,
        rating,
        review,
        reviewTitle,
      });
    }

    const stats = await Rating.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$productId",
          avgRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    const avgRating = stats[0]?.avgRating || 0;
    const totalRatings = stats[0]?.totalRatings || 0;

    await Product.findByIdAndUpdate(productId, {
      averageRating: avgRating,
      totalRatings: totalRatings,
    });

    res.json({ message: "Rating saved", avgRating, totalRatings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductRatings = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratings = await Rating.find({ productId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
