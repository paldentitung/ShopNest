const {
  createContact,
  readContact,
} = require("../controllers/contactController");

const Router = require("express").Router();

Router.get("/", readContact);
Router.post("/", createContact);

module.exports = Router;
