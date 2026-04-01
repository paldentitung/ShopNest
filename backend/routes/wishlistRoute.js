const {
  addWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");
const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const Router = require("express").Router();

Router.get("/", auth, asyncHandler(getWishlist));
Router.post("/:id", auth, asyncHandler(addWishlist));
Router.delete("/:id", auth, asyncHandler(removeWishlist));
module.exports = Router;
