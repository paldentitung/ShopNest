const notificationService = require("../services/notificationService");

exports.getNotifications = async (req, res) => {
  const notifications = await notificationService.getNotifications(req.user.id);
  res.status(200).json({
    success: true,
    message: "Get Notification ",
    data: notifications,
  });
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
  res.status(201).json({
    success: true,
    message: "Notification created",
    data: notification,
  });
};

exports.readNotification = async (req, res) => {
  const notification = await notificationService.readNotification(
    req.params.id,
  );
  res.status(200).json({
    success: true,
    message: "Read notification",
    data: notification,
  });
};

exports.readAllNotification = async (req, res) => {
  const notifications = await notificationService.readAllNotifications(
    req.user.id,
  );
  res.status(200).json({
    success: true,
    message: "Read All notification",
    data: notifications,
  });
};
