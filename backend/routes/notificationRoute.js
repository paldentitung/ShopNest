const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getNotifications,
  createNotification,
  readNotification,
} = require("../controllers/notificationController");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", auth, asyncHandler(getNotifications));
router.post("/", auth, asyncHandler(createNotification));
router.patch("/:id/read", auth, asyncHandler(readNotification));

module.exports = router;
