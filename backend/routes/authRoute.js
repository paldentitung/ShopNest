const express = require("express");
const Router = express.Router();
const {
  Register,
  Login,
  changePassword,
} = require("../controllers/authController");

const auth = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

Router.post("/register", asyncHandler(Register));
Router.post("/login", asyncHandler(Login));
Router.patch("/changepassword", auth, asyncHandler(changePassword));
module.exports = Router;
