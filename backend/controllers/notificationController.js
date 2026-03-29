const notificationService = require("../services/notificationService");
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications(
      req.user.id,
    );
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNotification = async (req, res) => {
  const { message, type } = req.body;
  try {
    if (!message || !type) {
      return res.status(400).json({
        message: "Message and type are required",
      });
    }
    const notification = await notificationService.createNotification(
      req.user.id,
      message,
      type,
    );
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.readNotification = async (req, res) => {
  try {
    const notification = await notificationService.readNotification(
      req.params.id,
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
