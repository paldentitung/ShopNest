const Notification = require("../models/Notification");

exports.getNotifications = async (userId) => {
  return await Notification.find({
    userId,
  }).sort({ createdAt: -1 });
};

exports.createNotification = async (userId, message, type) => {
  const notification = new Notification({
    userId,
    message,
    type,
  });
  await notification.save();
};

exports.readNotification = async (id) => {
  return await Notification.findByIdAndUpdate(
    id,
    { read: true, readAt: new Date() },
    { new: true },
  );
};

exports.readAllNotifications = async (userId) => {
  return await Notification.updateMany(
    { userId, read: false },
    { read: true, readAt: new Date() },
  );
};
