const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getNotifications,
  createNotification,
  readNotification,
} = require("../controllers/notificationController");

// All routes require auth
router.get("/", auth, getNotifications);
router.post("/", auth, createNotification);
router.patch("/:id/read", auth, readNotification);

module.exports = router;
