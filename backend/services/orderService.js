const Order = require("../models/Order");
const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");
exports.getOrders = async (page = null, limit = null) => {
  let query = Order.find().populate("userId", "username email");

  const total = await Order.countDocuments();
  let orders;

  if (page && limit) {
    const skip = (page - 1) * limit;
    orders = await query.skip(skip).limit(limit).exec();
    const pages = Math.ceil(total / limit);

    return { data: orders, total, page, pages };
  } else {
    orders = await query.exec();
    return { data: orders, total, page: 1, pages: 1 };
  }
};
exports.updateOrderStatus = async (id, orderStatus) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { new: true },
  );

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  await Notification.create({
    userId: order.userId,
    message: `Good news! Your order is now ${orderStatus}.`,
    type: "info",
  });
  return order;
};

exports.getMyOrder = async (userId) => {
  const order = await Order.find({ userId }).populate(
    "items.productId",
    "name price",
  );
  return order;
};

exports.getPurchaseHistory = async (userId) => {
  return await Order.find({
    userId,
    orderStatus: { $in: ["delivered"] },
  }).populate("items.productId", "name price");
};
exports.getMyInProgressOrders = async (userId) => {
  return await Order.find({
    userId,
    orderStatus: { $in: ["pending", "shipped"] },
  }).populate("items.productId", "name price");
};
