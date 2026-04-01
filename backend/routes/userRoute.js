const {
  getAllUsers,
  getUser,
  updateProfile,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const asyncHandler = require("../utils/asyncHandler");

const Router = require("express").Router();

Router.get("/all", auth, isAdmin, asyncHandler(getAllUsers));
Router.get("/", auth, asyncHandler(getUser));
Router.post("/", upload.single("avatar"), auth, asyncHandler(updateProfile));

module.exports = Router;
