const Notification = require("../models/Notification");

// Get notifications for the logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id, // get ID from JWT
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a notification for a user
exports.createNotification = async (req, res) => {
  const { message, type } = req.body; // userId not needed; get from req.user
  try {
    const notification = new Notification({
      userId: req.user.id, // assign logged-in user
      message,
      type,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark notification as read
exports.readNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
