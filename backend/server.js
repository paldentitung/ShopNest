require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectdb = require("./config/db");
const app = express();
const PORT = process.env.PORT || 7777;
app.use(cors());
app.use(express.json());

// connect mongodb
connectdb();

// routes
const ProductRoute = require("./routes/productRoute");

// define routes
app.use("/api/products", ProductRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
