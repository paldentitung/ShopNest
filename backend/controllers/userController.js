const userService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

exports.getUser = async (req, res) => {
  const user = await userService.getUser(req.user.id);
  res.status(200).json({ user });
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;

  const updateData = {};
  if (req.file) updateData.avatar = `http://localhost:3000/${req.file.path}`;
  else if (req.body.avatar) updateData.avatar = req.body.avatar;

  if (req.body.username) updateData.username = req.body.username;
  if (req.body.address) updateData.address = req.body.address;
  if (req.body.phone) updateData.phone = req.body.phone;

  const updatedUser = await userService.updateProfile(userId, updateData);

  res.status(200).json({
    message: "Profile updated",
    user: updatedUser,
  });
};
