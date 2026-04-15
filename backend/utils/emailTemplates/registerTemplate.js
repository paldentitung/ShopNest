const baseTemplate = require("./baseTemplate");

const registerTemplate = (username) => {
  const content = `
    <h2 style="color: #2a9d8f;">Welcome to Your App 🎉</h2>

    <p>Hello <strong>${username}</strong>,</p>

    <p>
      Thanks for joining us! Your account has been successfully created and you’re all set to explore everything we have to offer.
    </p>

    <p>
      You can now browse features, update your profile, and start using the platform right away.
    </p>

    <p>
      If you ever need help, our support team is always here for you.
    </p>

    <p>We’re excited to have you onboard 🚀</p>
  `;

  return baseTemplate(content);
};

module.exports = { registerTemplate };
