"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Route to get all notifications for a user
router.get("/", (0, auth_1.default)(), notification_controller_1.NotificationController.getNotifications);
// Route to mark a notification as read
router.patch("/:notificationId/read", (0, auth_1.default)(), notification_controller_1.NotificationController.markAsRead);
// Route to delete a notification
router.delete("/:notificationId", (0, auth_1.default)(), notification_controller_1.NotificationController.deleteNotification);
exports.NotificationRoutes = router;
