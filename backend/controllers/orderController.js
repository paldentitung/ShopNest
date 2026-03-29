const orderService = require("../services/orderService");
exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.orderStatus,
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
