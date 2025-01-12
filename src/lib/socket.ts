import { Server } from "socket.io";
import http from "http";
import app from "../app";

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Allowed origin
    credentials: true, // Allow credentials
  },
});

// Store online users
const userSocketMap: { [key: string]: string } = {};

// Get Socket ID for a user
export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Save user ID and Socket ID
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, server as socketServer };
