const {
  createContact,
  readContact,
  deleteContact,
  markAsRead,
} = require("../controllers/contactController");
const validate = require("../middleware/validate");

const Router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const { createContactValidator } = require("../validators/contactValidator");

Router.get("/", asyncHandler(readContact));
Router.post("/", createContactValidator, validate, asyncHandler(createContact));
Router.delete("/:id", asyncHandler(deleteContact));
Router.patch("/:id", asyncHandler(markAsRead));

module.exports = Router;
