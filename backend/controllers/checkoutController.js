const checkoutService = require("../services/checkoutService");
exports.checkout = async (req, res) => {
  try {
    const { shippingMethod, paymentMethod } = req.body;

    const order = await checkoutService.checkout(
      req.user.id,
      shippingMethod,
      paymentMethod,
    );

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
