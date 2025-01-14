"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    eventId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ["event_update", "new_attendee", "withdraw", "event_full"],
        required: true,
    },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
exports.Notification = (0, mongoose_1.model)("Notification", notificationSchema);
