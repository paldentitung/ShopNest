const Product = require("../models/Product");
const Rating = require("../models/Rating");
const mongoose = require("mongoose");

exports.rateProduct = async (
  userId,
  productId,
  rating,
  review,
  reviewTitle,
) => {
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
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
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

  // Update product
  await Product.findByIdAndUpdate(
    productId,
    { averageRating: avgRating, totalRatings },
    { new: true },
  );

  // Return stats separately
  return { avgRating, totalRatings };
};

exports.getProductRatings = async (productId) => {
  const ratings = await Rating.find({ productId })
    .populate("userId", "username")
    .sort({ createdAt: -1 });

  return ratings;
};
