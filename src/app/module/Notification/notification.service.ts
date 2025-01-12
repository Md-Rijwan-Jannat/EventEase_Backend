import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Notification } from "./notification.model";
import { User } from "../Auth/auth.model";

// Get all notifications for a user
const getNotifications = async (userId: string) => {
  const notifications = await Notification.find({ userId }).sort({
    createdAt: -1,
  });

  if (!notifications) {
    throw new AppError(httpStatus.NOT_FOUND, "Notifications not found");
  }

  return notifications;
};

// Mark a notification as read
const markAsRead = async (notificationId: string) => {
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

// Delete a notification
const deleteNotification = async (ownedBy: string, notificationId: string) => {
  const isUserExists = await User.findById(ownedBy);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new AppError(httpStatus.NOT_FOUND, "Notification not found");
  }

  if (notification?.userId.toString() !== ownedBy) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }

  const result = await Notification.findByIdAndDelete(notificationId);
  return result;
};

export const NotificationServices = {
  getNotifications,
  markAsRead,
  deleteNotification,
};
