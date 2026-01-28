require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectdb = require("./config/db");
const app = express();
const PORT = process.env.PORT || 7777;

connectdb();

app.listen(() => {
  console.log(`server running in ${PORT}`);
});
