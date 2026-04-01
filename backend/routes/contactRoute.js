const {
  createContact,
  readContact,
  deleteContact,
  markAsRead,
} = require("../controllers/contactController");

const Router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");

Router.get("/", asyncHandler(readContact));
Router.post("/", asyncHandler(createContact));
Router.delete("/:id", asyncHandler(deleteContact));
Router.patch("/:id", asyncHandler(markAsRead));

module.exports = Router;
