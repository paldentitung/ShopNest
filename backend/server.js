require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectdb = require("./config/db");
const app = express();
const PORT = process.env.PORT || 7777;

const allowedOrigins = [
  "http://localhost:5173",
  "https://shopnest-beta-three.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  }),
);

// important for preflight requests
app.options("*", cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// connect mongodb
connectdb();

// routes
const ProductRoute = require("./routes/productRoute");
const AuthRoute = require("./routes/authRoute");
const CartRoute = require("./routes/cartRoute");
const CheckoutRoute = require("./routes/checkoutRoute");
const OrderRoute = require("./routes/orderRoute");
const NotificationRoute = require("./routes/notificationRoute");
const UserRoute = require("./routes/userRoute");
const ContactRoute = require("./routes/contactRoute");
const RatingRoute = require("./routes/ratingRoute");
const WishlistRoute = require("./routes/wishlistRoute");
const AnalyticsRoute = require("./routes/analyticsRoute");
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
app.use("/api/analytics", AnalyticsRoute);
// error handle
app.use(errorMiddleware);

// server running
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
