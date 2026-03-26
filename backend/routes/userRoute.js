const { getAllUser, updateProfile } = require("../controllers/userController");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const Router = require("express").Router();

Router.get("/", auth, isAdmin, getAllUser);
Router.post("/", upload.single("image"), auth, updateProfile);

module.exports = Router;
