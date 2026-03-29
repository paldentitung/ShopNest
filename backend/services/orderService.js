const Order = require("../models/Order");
const Notification = require("../models/Notification");

exports.getOrders = async () => {
  return await Order.find().populate("userId", "username email").exec();
};
exports.updateOrderStatus = async (id, orderStatus) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    { new: true },
  );

  if (!order) {
    throw new Error("Order not found");
  }

  await Notification.create({
    userId: order.userId,
    message: `Good news! Your order is now ${orderStatus}.`,
    type: "info",
  });
  return order;
};
