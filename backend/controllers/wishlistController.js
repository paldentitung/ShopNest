const Product = require("../models/Product");
const User = require("../models/User");
const wishlistService = require("../services/wishlistService");
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user.id);
    await res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.addWishlist(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.removeWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.remvoeWishlist(
      req.user.id,
      req.params.id,
    );

    res.status(200).json({
      message: "Removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
