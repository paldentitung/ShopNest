const notificationService = require("../services/notificationService");

exports.getNotifications = async (req, res) => {
  const notifications = await notificationService.getNotifications(req.user.id);
  res.json(notifications);
};

exports.createNotification = async (req, res) => {
  const { message, type } = req.body;
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
};

exports.readNotification = async (req, res) => {
  const notification = await notificationService.readNotification(
    req.params.id,
  );
  res.json(notification);
};
