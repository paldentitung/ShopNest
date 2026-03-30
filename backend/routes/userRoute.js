const {
  getAllUsers,
  getUser,
  updateProfile,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const Router = require("express").Router();

Router.get("/all", auth, isAdmin, getAllUsers);
Router.get("/", auth, getUser);
Router.post("/", upload.single("avatar"), auth, updateProfile);

module.exports = Router;
