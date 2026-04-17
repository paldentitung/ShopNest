const express = require("express");
const Router = express.Router();
const {
  Register,
  Login,
  changePassword,
  authMe,
  forgotPassword,
  resetPasswordController,
  verifyEmail,
} = require("../controllers/authController");

const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");
const {
  registerValidator,
  loginValidator,
  changePasswordValidator,
} = require("../validators/authValidator");

Router.get("/authme", auth, asyncHandler(authMe));
Router.post("/register", registerValidator, asyncHandler(Register));
Router.get("/verify-email/:token", asyncHandler(verifyEmail));

Router.post("/login", loginValidator, asyncHandler(Login));
Router.patch(
  "/changepassword",
  auth,
  changePasswordValidator,
  asyncHandler(changePassword),
);

Router.post("/forgot-password", asyncHandler(forgotPassword));
Router.post("/reset-password/:token", asyncHandler(resetPasswordController));
module.exports = Router;
