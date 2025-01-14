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
exports.EventServices = void 0;
const event_model_1 = require("./event.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("../Auth/auth.model");
const socket_1 = require("../../../lib/socket");
const notification_model_1 = require("../Notification/notification.model");
// Create a new event
const createEvent = (createdBy, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const isUserExists = yield auth_model_1.User.findById(createdBy);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check for duplicate event (same name, date, and location)
    const isEventExists = yield event_model_1.Event.findOne({
        name: payload.name,
        date: payload.date,
        location: payload.location,
    });
    if (isEventExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "An event with the same name, date, and location already exists");
    }
    // Check for duplicate event (same name on the same date)
    const isSameDateEventExists = yield event_model_1.Event.findOne({
        name: payload.name,
        date: payload.date,
    });
    if (isSameDateEventExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "An event with the same name cannot be created on the same date");
    }
    // Create the event
    const event = yield event_model_1.Event.create(Object.assign(Object.assign({}, payload), { createdBy }));
    return event;
});
// Get all events
const getAllMyEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.User.findById(userId);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const events = yield event_model_1.Event.find({ createdBy: userId }).populate("createdBy");
    if (!events) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No events found in database");
    }
    return events;
});
// Get all event without my event
// Get all events excluding user's own events
const getAllOtherEvents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const isUserExists = yield auth_model_1.User.findById(userId);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Find events excluding those created by the user
    const events = yield event_model_1.Event.find({ createdBy: { $ne: userId } }).populate("createdBy");
    if (!events || events.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No events found in database");
    }
    return events;
});
// Get a single event by ID
const getEventById = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.User.findById(userId);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const event = yield event_model_1.Event.findById(id).populate("createdBy");
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This event does not exist");
    }
    return event;
});
// Register an attendee to an event
const registerUserToEvent = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exists
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Find the event
    const event = yield event_model_1.Event.findById(eventId);
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    // Check if the user is already registered
    if (event.attendees.includes(userId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is already registered for this event");
    }
    // Check if the event has remaining spots
    if (event.maxAttendees <= 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Event is fully booked");
    }
    // Register the user
    event.attendees.push(userId);
    event.maxAttendees -= 1;
    // Save the updated event
    yield event.save();
    // Create a notification for the event creator
    const notification = yield notification_model_1.Notification.create({
        userId: event.createdBy, // Notify the event creator
        eventId: event._id,
        message: `A new attendee (${user.name}) has registered for your event.`,
        type: "new_attendee",
        isRead: false,
    });
    // Broadcast real-time notification to the event creator
    const receiverSocketId = (0, socket_1.getReceiverSocketId)(event.createdBy);
    if (receiverSocketId) {
        socket_1.io.to(receiverSocketId).emit("newNotification", {
            userId: event.createdBy,
            eventId: event._id,
            message: notification.message,
            type: notification.type,
        });
    }
    return event;
});
// Withdraw an attendee from an event
const withdrawUserFromEvent = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exists
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Find the event
    const event = yield event_model_1.Event.findById(eventId);
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    // Check if the user is not registered
    if (!event.attendees.includes(userId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is not registered for this event");
    }
    // Withdraw the user
    event.attendees = event.attendees.filter((id) => id !== userId);
    event.maxAttendees += 1;
    // Save the updated event
    yield event.save();
    // Create a notification for the event creator
    const notification = yield notification_model_1.Notification.create({
        userId: event.createdBy, // Notify the event creator
        eventId: event._id,
        message: `An attendee (${user.name}) has withdrawn from your event.`,
        type: "withdraw",
        isRead: false,
    });
    // Broadcast real-time notification to the event creator
    const receiverSocketId = (0, socket_1.getReceiverSocketId)(event.createdBy);
    if (receiverSocketId) {
        socket_1.io.to(receiverSocketId).emit("newNotification", {
            userId: event.createdBy,
            eventId: event._id,
            message: notification.message,
            type: notification.type,
        });
    }
    return event;
});
// Update an event by ID
const updateEvent = (ownedBy, eventId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const user = yield auth_model_1.User.findById(ownedBy);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check if the event exists
    const isEventExists = yield event_model_1.Event.findById(eventId);
    if (!isEventExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    // Check if the user is the creator of the event
    if (isEventExists.createdBy.toString() !== ownedBy) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access");
    }
    // Update the event
    const event = yield event_model_1.Event.findByIdAndUpdate(eventId, payload, {
        new: true,
        runValidators: true,
    });
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    // Create a notification
    const notification = yield notification_model_1.Notification.create({
        userId: ownedBy,
        eventId: event._id,
        message: `The event '${event.name}' has been updated.`,
        type: "event_update",
        isRead: false,
    });
    // Broadcast real-time notification to the event creator
    const receiverSocketId = (0, socket_1.getReceiverSocketId)(ownedBy);
    if (receiverSocketId) {
        socket_1.io.to(receiverSocketId).emit("newNotification", {
            userId: ownedBy,
            eventId: event._id,
            message: notification.message,
            type: notification.type,
        });
    }
    // Optionally, notify all attendees about the event update
    for (const attendeeId of event.attendees) {
        const attendeeSocketId = (0, socket_1.getReceiverSocketId)(attendeeId);
        if (attendeeSocketId) {
            socket_1.io.to(attendeeSocketId).emit("newNotification", {
                userId: attendeeId,
                eventId: event._id,
                message: `The event '${event.name}' has been updated.`,
                type: "event_update",
            });
        }
    }
    return event;
});
// Delete an event by ID
const deleteEvent = (ownedBy, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.User.findById(ownedBy);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const event = yield event_model_1.Event.findByIdAndDelete(eventId);
    if (!event) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Event not found");
    }
    if ((event === null || event === void 0 ? void 0 : event.createdBy.toString()) !== ownedBy) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access");
    }
    return event;
});
exports.EventServices = {
    createEvent,
    registerUserToEvent,
    withdrawUserFromEvent,
    getAllMyEvents,
    getAllOtherEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};
