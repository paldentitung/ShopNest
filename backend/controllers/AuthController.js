const authService = require("../services/authService");
exports.Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await authService.register(username, email, password);

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const result = await authService.changePassword(
      req.user.id,
      currentPassword,
      newPassword,
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};
