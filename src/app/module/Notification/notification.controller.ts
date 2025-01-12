import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NotificationServices } from "./notification.service";

// Get all notifications for a user
const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id; // Assuming `req.user` contains authenticated user info
  const notifications = await NotificationServices.getNotifications(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notifications fetched successfully",
    data: notifications,
  });
});

// Mark a notification as read
const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const updatedNotification =
    await NotificationServices.markAsRead(notificationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification marked as read",
    data: updatedNotification,
  });
});

// Delete a notification
const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  await NotificationServices.deleteNotification(req.user.id, notificationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification deleted successfully",
  });
});

export const NotificationController = {
  getNotifications,
  markAsRead,
  deleteNotification,
};
