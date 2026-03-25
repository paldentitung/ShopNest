const {
  addWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");
const auth = require("../middleware/auth");
const Router = require("express").Router();

Router.get("/", auth, getWishlist);
Router.post("/:id", auth, addWishlist);
Router.delete("/:id", auth, removeWishlist);
module.exports = Router;
