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
const mongoose_1 = __importDefault(require("mongoose"));
const socket_1 = require("./lib/socket");
const config_1 = __importDefault(require("./config"));
let server;
// Main function to bootstrap the application
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log("✅ Connected to MongoDB");
            // Start server with Socket.IO integration
            server = socket_1.socketServer.listen(config_1.default.port, () => {
                console.log(`🚀 Server is running on http://localhost:${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error("❌ Database connection failed:", err);
        }
    });
}
// Initialize application
main();
// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection detected:", err);
    if (server) {
        server.close(() => {
            console.log("💀 Server is shutting down due to unhandled rejection");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception detected:", err);
    process.exit(1);
});
