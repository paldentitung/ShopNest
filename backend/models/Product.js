const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },

    // IMAGES
    images: [{ type: String, required: true }],

    // PRICING
    priceCents: { type: Number, required: true, min: 0 },
    discountPriceCents: { type: Number, min: 0 },

    // VARIATIONS (FOR CLOTHING)
    variations: [
      {
        color: String,
        size: String,
        stock: Number,
      },
    ],

    // TOTAL STOCK (FALLBACK)
    stock: { type: Number, default: 0 },

    // PRODUCT STATUS
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
