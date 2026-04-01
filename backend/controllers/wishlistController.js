const wishlistService = require("../services/wishlistService");

exports.getWishlist = async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user.id);
  await res.status(200).json({ wishlist });
};

exports.addWishlist = async (req, res) => {
  const wishlist = await wishlistService.addWishlist(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    message: "Added to wishlist",
    wishlist,
  });
};

exports.removeWishlist = async (req, res) => {
  const wishlist = await wishlistService.remvoeWishlist(
    req.user.id,
    req.params.id,
  );

  res.status(200).json({
    message: "Removed from wishlist",
    wishlist,
  });
};
