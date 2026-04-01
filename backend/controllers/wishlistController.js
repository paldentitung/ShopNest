const wishlistService = require("../services/wishlistService");

exports.getWishlist = async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user.id);
  res.status(200).json({
    success: true,
    message: "Wishlist fetched successfully",
    data: wishlist,
  });
};

exports.addWishlist = async (req, res) => {
  const wishlist = await wishlistService.addWishlist(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Added to wishlist",
    data: wishlist,
  });
};

exports.removeWishlist = async (req, res) => {
  const wishlist = await wishlistService.remvoeWishlist(
    req.user.id,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    message: "Removed from wishlist",
    data: wishlist,
  });
};
