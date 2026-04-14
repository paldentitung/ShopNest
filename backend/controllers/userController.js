const userService = require("../services/userService");
const sanitizeUser = require("../utils/sanitizeUser");

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({
    success: true,
    message: "Users fetched",
    data: users,
  });
};

exports.getUser = async (req, res) => {
  const user = await userService.getUser(req.user.id);
  res.status(200).json({
    success: true,
    message: "User fetched",
    data: user,
  });
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;

  const updateData = {};

  if (req.file) {
    updateData.avatar = `http://localhost:3000/${req.file.path}`;
  } else if (req.body.avatar) {
    updateData.avatar = req.body.avatar;
  }

  if (req.body.username) updateData.username = req.body.username;
  if (req.body.phone) updateData.phone = req.body.phone;

  if (req.body.address) {
    try {
      updateData.address = JSON.parse(req.body.address);
    } catch (err) {
      throw new AppError("Invalid address format", 400);
    }
  }

  const updatedUser = await userService.updateProfile(userId, updateData);

  res.status(200).json({
    success: true,
    message: "Profile updated",
    data: updatedUser,
  });
};

exports.blockUser = async (req, res) => {
  const { userId } = req.params;

  const user = await userService.blockUser(userId);
  res.status(200).json({
    success: true,
    message: "User blocked",
    data: sanitizeUser(user),
  });
};

exports.unblockUser = async (req, res) => {
  const { userId } = req.params;

  const user = await userService.unblockUser(userId);
  res.status(200).json({
    success: true,
    message: "User blocked",
    data: sanitizeUser(user),
  });
};
