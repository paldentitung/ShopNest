const authService = require("../services/authService");
const sendEmail = require("../utils/sendEmail");

exports.Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    await sendEmail({
      to: user.email,
      subject: "Welcome!",
      html: `<h1>Hello ${user.username}</h1><p>Welcome to our app 🚀</p>`,
    });

    res.status(201).json({
      success: true,
      message: "User created",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  res.status(200).json({
    success: true,
    message: "Login succesfully ",
    data: result,
  });
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const result = await authService.changePassword(
    req.user.id,
    currentPassword,
    newPassword,
  );

  res.status(200).json({
    success: true,
    message: "Password changed successfully  ",
    data: result,
  });
};

exports.authMe = async (req, res) => {
  const userId = req.user.id;

  const user = await authService.authMe(userId);

  res.status(200).json({
    success: true,
    message: "auth me successfully  ",
    data: user,
  });
};
