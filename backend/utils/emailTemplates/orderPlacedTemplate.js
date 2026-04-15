const baseTemplate = require("./baseTemplate");

const orderPlacedTemplate = (username, orderId, total) => {
  const content = `
    <h2 style="color: #264653;">Order Confirmed 🛒</h2>

    <p>Hello <strong>${username}</strong>,</p>

    <p>
      Great news! Your order has been successfully placed and is now being processed.
    </p>

    <p>
      We’re carefully preparing your items for shipment. Once your order is shipped, you will receive a notification with tracking details.
    </p>

    <p>
      You will also be notified when your order is out for delivery and when it has been successfully delivered.
    </p>

    <p>
      <strong>Order ID:</strong> ${orderId}<br/>
      <strong>Total Amount:</strong> $${total}
    </p>

    <p>
      Thank you for shopping with us 🛍️ We truly appreciate your trust.
    </p>
  `;

  return baseTemplate(content);
};

module.exports = { orderPlacedTemplate };
