import { getReceiverSocketId, io } from "../../../lib/socket";

// Emit real-time updates to all users
export function emitEventUpdate(eventId: string, message: string, data: any) {
  io.emit("eventUpdated", { eventId, message, data });
}

// Notify a specific user
export function notifyUser(userId: string, event: string, data: any) {
  const socketId = getReceiverSocketId(userId);
  if (socketId) {
    io.to(socketId).emit(event, data);
  }
}
