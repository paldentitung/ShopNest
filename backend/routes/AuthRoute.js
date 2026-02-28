const express = require("express");
const Router = express.Router();
const { Register, Login } = require("../controllers/AuthController");

Router.post("/register", Register);
Router.post("/login", Login);

module.exports = Router;
