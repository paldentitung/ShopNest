const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getOverview = async () => {
  const [totalProducts, totalOrders, totalUsers, revenueData] =
    await Promise.all([
      Product.countDocuments(),

      Order.countDocuments({
        orderStatus: { $ne: "cancelled" },
      }),

      User.countDocuments({ role: "user" }),

      Order.aggregate([
        {
          $match: {
            $or: [{ paymentStatus: "paid" }, { orderStatus: "delivered" }],
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),
    ]);

  const totalRevenue = revenueData[0]?.totalRevenue
    ? revenueData[0].totalRevenue.toFixed(2)
    : "0.00";

  return {
    totalProducts,
    totalOrders,
    totalUsers,
    totalRevenue,
  };
};
