const {
  getAllUsers,
  getUser,
  updateProfile,
  blockUser,
  unblockUser,
  removeAvatar,
} = require("../controllers/userController");

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middleware/validate");

const {
  getUserValidator,
  updateProfileValidator,
  blockUserValidator,
  unblockUserValidator,
} = require("../validators/userValidator");

const Router = require("express").Router();

Router.get("/all", auth, isAdmin, asyncHandler(getAllUsers));

Router.get("/", auth, getUserValidator, validate, asyncHandler(getUser));

Router.post(
  "/",
  auth,
  upload.single("avatar"),
  updateProfileValidator,
  validate,
  asyncHandler(updateProfile),
);

Router.patch(
  "/block/:userId",
  auth,
  isAdmin,
  blockUserValidator,
  validate,
  asyncHandler(blockUser),
);

Router.patch(
  "/unblock/:userId",
  auth,
  isAdmin,
  unblockUserValidator,
  validate,
  asyncHandler(unblockUser),
);

Router.patch("/removeavatar", auth, asyncHandler(removeAvatar));

module.exports = Router;
