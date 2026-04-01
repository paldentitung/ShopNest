const orderService = require("../services/orderService");

exports.getOrders = async (req, res) => {
  const orders = await orderService.getOrders();
  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
};
exports.updateOrderStatus = async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.orderStatus,
  );
  res.status(200).json({
    success: true,
    message: "Updated product successfully",
    data: order,
  });
};
