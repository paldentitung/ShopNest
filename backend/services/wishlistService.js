const Product = require("../models/Product");
const User = require("../models/User");
const AppError = require("../utils/AppError");

exports.getWishlist = async (id) => {
  const user = await User.findById(id)
    .populate("wishlist", "name priceCents images")
    .lean();

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user.wishlist.map((product) => ({
    _id: product._id,
    name: product.name,
    price: product.priceCents,
    image: product.images,
  }));
};

exports.addWishlist = async (productId, userId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.wishlist) {
    user.wishlist = [];
  }

  const isExist = user.wishlist.some((item) => item.toString() === productId);
  if (isExist) {
    throw new AppError("Wishlist already exists", 400);
  }

  user.wishlist.push(productId);
  await user.save();

  return user.wishlist;
};

exports.remvoeWishlist = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.wishlist) user.wishlist = [];

  user.wishlist = user.wishlist.filter((w) => w.toString() !== productId);

  await user.save();

  return user.wishlist;
};
