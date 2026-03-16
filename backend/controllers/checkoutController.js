const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const orderItems = cart.items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      price: item.product.price || 0,
      quantity: item.quantity,
      size: item.size || "",
      color: item.color || "",
    }));

    const totalAmount = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentMethod: "COD",
    });

    cart.items = [];
    await cart.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
