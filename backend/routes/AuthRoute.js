const express = require("express");
const Router = express.Router();
const {
  Register,
  Login,
  changePassword,
} = require("../controllers/AuthController");

const auth = require("../middleware/auth");

Router.post("/register", Register);
Router.post("/login", Login);
Router.patch("/changepassword", auth, changePassword);
module.exports = Router;
