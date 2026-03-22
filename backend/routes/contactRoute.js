const {
  createContact,
  readContact,
  deleteContact,
} = require("../controllers/contactController");

const Router = require("express").Router();

Router.get("/", readContact);
Router.post("/", createContact);
Router.delete("/:id", deleteContact);
module.exports = Router;
