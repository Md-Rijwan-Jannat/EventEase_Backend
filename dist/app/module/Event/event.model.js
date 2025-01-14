"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    attendees: [{ type: String, ref: "User", default: [] }],
    createdBy: { type: String, required: true, ref: "User" },
}, {
    timestamps: true,
});
exports.Event = (0, mongoose_1.model)("Event", EventSchema);
