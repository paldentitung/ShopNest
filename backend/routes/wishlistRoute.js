const { addWishlist } = require("../controllers/wishlistController");
const auth = require("../middleware/auth");
const Router = require("express").Router();

Router.post("/:id", auth, addWishlist);

module.exports = Router;
