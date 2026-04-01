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

  if (!userId || !productId)
    throw new AppError("User and Product are required", 400);
  if (!rating || isNaN(rating))
    throw new AppError("Rating must be a number", 400);
  if (rating < 1 || rating > 5)
    throw new AppError("Rating must be between 1 and 5", 400);

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
