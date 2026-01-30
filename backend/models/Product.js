const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    images: { type: String, required: true },
    priceCents: { type: Number, required: true, min: 0 },
    rating: {
      stars: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    description: { type: String, required: true, trim: true },
    variations: { type: Array, default: [] },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
