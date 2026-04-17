const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// FIX: Use "Cancelled" (capitalized) everywhere to match DB values and frontend statusColors map.
// If your DB stores lowercase "cancelled", flip ALL instances below to lowercase instead.

exports.getOverview = async () => {
  const [
    totalProducts,
    totalOrders,
    totalUsers,
    revenueData,
    salesOverview,
    topProducts,
  ] = await Promise.all([
    Product.countDocuments(),

    Order.countDocuments({
      orderStatus: { $ne: "Cancelled" }, // FIX: was "cancelled"
    }),

    User.countDocuments({ role: "user" }),

    Order.aggregate([
      {
        $match: {
          $or: [{ paymentStatus: "paid" }, { orderStatus: "Delivered" }],
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]),

    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
          orderStatus: { $ne: "Cancelled" }, // FIX: was "cancelled"
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%b %d",
              date: "$createdAt",
            },
          },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]),

    Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Cancelled" }, // FIX: was "cancelled"
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          name: "$product.name",
          sales: "$totalSold",
          images: "$product.images",
        },
      },
    ]),
  ]);

  const totalRevenue = revenueData?.[0]?.totalRevenue || 0;

  const formattedSales = salesOverview.map((item) => ({
    date: item._id,
    revenue: item.revenue,
  }));

  return {
    totalProducts,
    totalOrders,
    totalUsers,
    totalRevenue,
    salesOverview: formattedSales,
    topProducts,
  };
};
