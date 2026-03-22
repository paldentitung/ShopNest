const {
  createContact,
  readContact,
  deleteContact,
  markAsRead,
} = require("../controllers/contactController");

const Router = require("express").Router();

Router.get("/", readContact);
Router.post("/", createContact);
Router.delete("/:id", deleteContact);
Router.patch("/:id", markAsRead);

module.exports = Router;
