const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    //  Get shipping method from frontend
    const { shippingMethod, paymentMethod } = req.body;

    //  Fetch cart and populate product details
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    //  Map cart items to order items
    const orderItems = cart.items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      price: item.product.priceCents ? item.product.priceCents / 100 : 0,
      quantity: item.quantity,
      size: item.size || "",
      color: item.color || "",
    }));

    //  Calculate product total
    const productTotal = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    //  Calculate shipping cost
    let shippingCost = 0;
    if (shippingMethod === "standard") shippingCost = 0;
    else if (shippingMethod === "express") shippingCost = 9.99;
    else if (shippingMethod === "overnight") shippingCost = 24.99;

    //  Calculate VAT (13% of product total)
    const vatRate = 0.13;
    const vat = productTotal * vatRate;

    //  Calculate final total
    const finalTotalAmount = productTotal + shippingCost + vat;

    //  Create the order
    const order = await Order.create({
      userId,
      items: orderItems,
      productTotal,
      shippingCost,
      vat,
      totalAmount: finalTotalAmount,
      shippingMethod,
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentMethod: paymentMethod || "COD",
    });

    cart.items = [];
    await cart.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
