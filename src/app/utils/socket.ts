import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// A mapping of user IDs to their corresponding socket IDs
const userSocketMap: { [key: string]: string } = {};

// Utility function to get the socket ID for a specific user
export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Extract userId from the query parameters and store the mapping
  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;

  // Emit the list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

// Utility to emit event updates
export function emitEventUpdate(eventId: string, message: string, data: any) {
  // Broadcast event update to all connected clients
  io.emit("eventUpdated", {
    eventId,
    message,
    data,
  });
}

// Real-time updates for specific users
export function notifyUser(userId: string, event: string, data: any) {
  const socketId = getReceiverSocketId(userId);
  if (socketId) {
    io.to(socketId).emit(event, data);
  }
}

export { io, app, server };
