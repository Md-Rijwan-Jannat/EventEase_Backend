import { Schema, model, Model } from "mongoose";
import { TEvent } from "./event.interface";

const EventSchema: Schema<TEvent> = new Schema<TEvent>(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    attendees: [{ type: String, ref: "User", default: [] }],
    createdBy: { type: String, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Event: Model<TEvent> = model<TEvent>("Event", EventSchema);
