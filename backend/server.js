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
const OrderRoute = require("./routes/orderRoute");
const NotificationRoute = require("./routes/notificationRoute");
const UserRoute = require("./routes/userRoute");
const ContactRoute = require("./routes/contactRoute");
const RatingRoute = require("./routes/ratingRoute");
const WishlistRoute = require("./routes/wishlistRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
// define routes
app.use("/api/products", ProductRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/cart", CartRoute);
app.use("/api/checkout", CheckoutRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/notifications", NotificationRoute);
app.use("/api/user", UserRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/ratings", RatingRoute);
app.use("/api/wishlist", WishlistRoute);

// error handle
app.use(errorMiddleware);

// server running
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
