const Order = require("../models/Order");
const Notification = require("../models/Notification");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")
      .exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Notification.create({
      userId: order.userId,
      message: `Your order ${order._id} status changed to ${orderStatus}`,
      type: "info",
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
