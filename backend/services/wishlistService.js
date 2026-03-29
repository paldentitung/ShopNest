const Product = require("../models/Product");
const User = require("../models/User");

exports.getWishlist = async (id) => {
  const user = await User.findById(id)
    .populate("wishlist", "name priceCents images")
    .lean();

  if (!user) {
    throw new Error("User not found");
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
    throw new Error("Product not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.wishlist) {
    user.wishlist = [];
  }

  const isExist = user.wishlist.some((item) => item.toString() === productId);
  if (isExist) {
    throw new Error("Wishlist already exists");
  }

  user.wishlist.push(productId);
  await user.save();

  return user.wishlist;
};

exports.remvoeWishlist = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.wishlist) user.wishlist = [];

  user.wishlist = user.wishlist.filter((w) => w.toString() !== productId);

  await user.save();

  return user.wishlist;
};
