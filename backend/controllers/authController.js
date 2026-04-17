const authService = require("../services/authService");
const sendEmail = require("../utils/sendEmail");

exports.Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const result = await authService.register(username, email, password);

    res.status(201).json({
      success: true,
      message: result.message,
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

exports.forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body.email);
  res.status(200).json({
    success: true,
    message: "If an account exists, a reset link has been sent",
  });
};
exports.resetPasswordController = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  await authService.resetPassword(token, password);

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  await authService.verifyEmail(token);
  res.status(200).json({
    success: true,
    message: "Email verify successful",
  });
};
