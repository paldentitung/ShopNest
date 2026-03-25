const Product = require("../models/Product");
const User = require("../models/User");

exports.addWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.wishlist) user.wishlist = [];

    const isExist = user.wishlist.includes(id);

    if (isExist) {
      return res.status(400).json({
        message: "Wishlist already exists",
      });
    }

    user.wishlist.push(id);

    await user.save();

    res.status(200).json({
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
