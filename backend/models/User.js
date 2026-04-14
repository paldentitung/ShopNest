const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
