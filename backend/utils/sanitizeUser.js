const sanitizeUser = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    status: user.status,
  };
};

module.exports = sanitizeUser;
