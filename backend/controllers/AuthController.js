const authService = require("../services/authService");
exports.Register = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await authService.register(username, email, password);

  res.status(201).json({
    message: "User created",
    user,
  });
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  const data = await authService.login(email, password);

  res.status(200).json(data);
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const result = await authService.changePassword(
    req.user.id,
    currentPassword,
    newPassword,
  );

  res.status(200).json(result);
};
