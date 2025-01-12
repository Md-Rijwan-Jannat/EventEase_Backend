import { model, Schema } from "mongoose";
import { TNotification } from "./notification.interface";

const notificationSchema = new Schema<TNotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const Notification = model<TNotification>(
  "Notification",
  notificationSchema
);
