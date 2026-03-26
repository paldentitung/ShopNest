const User = require("../models/User");

exports.getAllUser = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        address: user.address,
        role: user.role,
        status: user.status,
        wishlist: user.wishlist,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const avatar = req.file ? req.file.path : req.body.avatar;
    const address = req.body.address;
    const phone = req.body.phone;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar, address, phone },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile updated",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        address: updatedUser.address,
        role: updatedUser.role,
        status: updatedUser.status,
        wishlist: updatedUser.wishlist,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
