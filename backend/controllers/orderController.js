const orderService = require("../services/orderService");

exports.getOrders = async (req, res) => {
  const orders = await orderService.getOrders();
  res.status(200).json(orders);
};
exports.updateOrderStatus = async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.orderStatus,
  );
  res.json(order);
};
