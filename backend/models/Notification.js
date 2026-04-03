const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["success", "error", "info"], default: "info" },
  read: { type: Boolean, default: false },
  readAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

notificationSchema.index({ readAt: 1 }, { expireAfterSeconds: 3600 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
