"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const notification_model_1 = require("./notification.model");
const auth_model_1 = require("../Auth/auth.model");
// Get all notifications for a user
const getNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notification_model_1.Notification.find({ userId }).sort({
        createdAt: -1,
    });
    if (!notifications) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notifications not found");
    }
    return notifications;
});
// Mark a notification as read
const markAsRead = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.findById(notificationId);
    if (!notification) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    }
    notification.isRead = true;
    yield notification.save();
    return notification;
});
// Delete a notification
const deleteNotification = (ownedBy, notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.User.findById(ownedBy);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const notification = yield notification_model_1.Notification.findById(notificationId);
    if (!notification) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    }
    if ((notification === null || notification === void 0 ? void 0 : notification.userId.toString()) !== ownedBy) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access");
    }
    const result = yield notification_model_1.Notification.findByIdAndDelete(notificationId);
    return result;
});
exports.NotificationServices = {
    getNotifications,
    markAsRead,
    deleteNotification,
};
