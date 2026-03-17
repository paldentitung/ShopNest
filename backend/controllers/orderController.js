const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "username email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
