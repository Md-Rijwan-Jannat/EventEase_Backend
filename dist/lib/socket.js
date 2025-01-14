"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServer = exports.io = void 0;
exports.getReceiverSocketId = getReceiverSocketId;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
// Create HTTP server
const server = http_1.default.createServer(app_1.default);
exports.socketServer = server;
// Configure Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"], // Allowed origin
        credentials: true, // Allow credentials
    },
});
exports.io = io;
// Store online users
const userSocketMap = {};
// Get Socket ID for a user
function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}
// Socket.IO connection
io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);
    // Save user ID and Socket ID
    const userId = socket.handshake.query.userId;
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
