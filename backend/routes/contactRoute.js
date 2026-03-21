const { createContact } = require("../controllers/contactController");

const Router = require("express").Router();

Router.post("/", createContact);

module.exports = Router;
