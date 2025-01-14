"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitEventUpdate = emitEventUpdate;
exports.notifyUser = notifyUser;
const socket_1 = require("../../../lib/socket");
// Emit real-time updates to all users
function emitEventUpdate(eventId, message, data) {
    socket_1.io.emit("eventUpdated", { eventId, message, data });
}
// Notify a specific user
function notifyUser(userId, event, data) {
    const socketId = (0, socket_1.getReceiverSocketId)(userId);
    if (socketId) {
        socket_1.io.to(socketId).emit(event, data);
    }
}
