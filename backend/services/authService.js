const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const sanitizeUser = require("../utils/sanitizeUser");
const sendEmail = require("../utils/sendEmail");
const {
  registerTemplate,
} = require("../utils/emailTemplates/registerTemplate");
exports.register = async (username, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  if (!username || !email || !password) {
    throw new AppError("All fields are required", 400);
  }
  if (newPassword.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  await sendEmail({
    to: email,
    subject: "Account Registered",
    html: registerTemplate(user.username),
  });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  if (user.status === "blocked") {
    throw new AppError("Your account has been blocked. Contact admin.", 403);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 400);
  }
  if (newPassword.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar || null,
      phone: user.phone || null,
      address: user.address || null,
    },
  };
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
  if (!currentPassword || !newPassword) {
    throw new AppError("All fields are required", 400);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError("Current password is incorrect", 400);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password changed successfully" };
};

exports.authMe = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status === "blocked") {
    throw new AppError("User is blocked", 403);
  }

  return sanitizeUser(user);
};
