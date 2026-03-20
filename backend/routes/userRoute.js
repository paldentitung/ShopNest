const { getAllUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const Router = require("express").Router();

Router.get("/", auth, isAdmin, getAllUser);

module.exports = Router;
