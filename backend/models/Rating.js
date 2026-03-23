const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    reviewTitle: {
      type: String,
      default: "",
    },
    review: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

ratingSchema.index({ userId: 1, productId: 1 }, { unique: true });

ratingSchema.index({ productId: 1 });
ratingSchema.index({ userId: 1 });

module.exports = mongoose.model("Rating", ratingSchema);
