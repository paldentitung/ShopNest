const baseTemplate = require("./baseTemplate");

const orderPlacedTemplate = (username, orderId, total) => {
  const content = `
    <h2 style="color: #264653;">Order Confirmed 🛒</h2>

    <p>Hello <strong>${username}</strong>,</p>

    <p>
      Great news! Your order has been successfully placed and is now being processed.
    </p>

    <p>
      We’re carefully preparing your items and will notify you as soon as your order is shipped.
    </p>

    <p>
      <strong>Order ID:</strong> ${orderId}<br/>
      <strong>Total Amount:</strong> $${total}
    </p>

    <p>
      You can track your order status anytime from your account dashboard.
    </p>

    <p>
      Thank you for shopping with us 🛍️
    </p>
  `;

  return baseTemplate(content);
};

module.exports = { orderPlacedTemplate };
