require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectdb = require("./config/db");
const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// connect mongodb
connectdb();

// routes
const ProductRoute = require("./routes/productRoute");
const AuthRoute = require("./routes/AuthRoute");
const CartRoute = require("./routes/cartRoute");
const CheckoutRoute = require("./routes/checkoutRoute");
// define routes
app.use("/api/products", ProductRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/cart", CartRoute);
app.use("/api/checkout", CheckoutRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
