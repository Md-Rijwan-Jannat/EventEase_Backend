import { Schema } from "mongoose";

export interface TNotification {
  userId: Schema.Types.ObjectId;
  eventId: Schema.Types.ObjectId;
  message: string;
  type: "event_update" | "new_attendee" | "withdraw" | "event_full";
  isRead: boolean;
  createdAt: Date;
}
