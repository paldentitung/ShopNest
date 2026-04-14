const User = require("../models/User");
const AppError = require("../utils/AppError");
// Get all users
exports.getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

// Get single user by id
exports.getUser = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const {
    _id,
    username,
    email,
    phone,
    avatar,
    address,
    role,
    status,
    wishlist,
  } = user;

  return {
    _id,
    username,
    email,
    phone,
    avatar,
    address,
    role,
    status,
    wishlist,
  };
};

// Update profile
exports.updateProfile = async (userId, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  const {
    _id,
    username,
    email,
    phone,
    avatar,
    address,
    role,
    status,
    wishlist,
  } = updatedUser;

  return {
    _id,
    username,
    email,
    phone,
    avatar,
    address,
    role,
    status,
    wishlist,
  };
};

exports.blockUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status === "blocked") {
    throw new AppError("User is already blocked", 400);
  }

  user.status = "blocked";
  await user.save();

  return user;
};

exports.unblockUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status === "active") {
    throw new AppError("User is already active", 400);
  }

  user.status = "active";
  await user.save();

  return user;
};

exports.removeAvatar = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.avatar = null;
  await user.save();
  return user;
};
