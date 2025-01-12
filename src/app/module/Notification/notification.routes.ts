import express from "express";
import { NotificationController } from "./notification.controller";
import Auth from "../../middlewares/auth";

const router = express.Router();

// Route to get all notifications for a user
router.get("/", Auth(), NotificationController.getNotifications);

// Route to mark a notification as read
router.patch(
  "/:notificationId/read",
  Auth(),
  NotificationController.markAsRead
);

// Route to delete a notification
router.delete(
  "/:notificationId",
  Auth(),
  NotificationController.deleteNotification
);

export const NotificationRoutes = router;
