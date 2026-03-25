const {
  addWishlist,
  getWishlist,
} = require("../controllers/wishlistController");
const auth = require("../middleware/auth");
const Router = require("express").Router();

Router.get("/", auth, getWishlist);
Router.post("/:id", auth, addWishlist);

module.exports = Router;
