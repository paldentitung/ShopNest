const checkoutService = require("../services/checkoutService");

exports.checkout = async (req, res) => {
  const { shippingMethod, paymentMethod } = req.body;

  const order = await checkoutService.checkout(
    req.user.id,
    shippingMethod,
    paymentMethod,
  );

  res.status(200).json({
    success: true,
    message: "Order placed ",
    data: order,
  });
};
