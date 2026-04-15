const baseTemplate = require("./baseTemplate");

const accountBlockedTemplate = (username) => {
  const content = `
    <h2 style="color: #e63946;">Account Access Update</h2>

    <p>Hello <strong>${username}</strong>,</p>

    <p>
      We wanted to inform you that your account has been temporarily restricted.
    </p>

    <p>
      This action may have been taken due to a violation of our platform guidelines or unusual activity detected on your account.
    </p>

    <p>
      During this time, some features may not be available.
    </p>

    <p>
      If you believe this was done in error, please contact our support team. We’ll be happy to review your case.
    </p>

    <p>
      Thank you for your understanding.
    </p>
  `;

  return baseTemplate(content);
};

module.exports = { accountBlockedTemplate };
