const express = require("express");
const Router = express.Router();
const {
  Register,
  Login,
  changePassword,
  authMe,
  forgotPassword,
  resetPasswordController,
} = require("../controllers/authController");

const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

Router.get("/authme", auth, asyncHandler(authMe));
Router.post("/register", asyncHandler(Register));

Router.post("/login", asyncHandler(Login));
Router.patch("/changepassword", asyncHandler(changePassword));

Router.post("/forgot-password", asyncHandler(forgotPassword));
Router.post("/reset-password/:token", asyncHandler(resetPasswordController));
module.exports = Router;
