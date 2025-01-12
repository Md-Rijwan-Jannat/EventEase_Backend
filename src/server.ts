import mongoose from "mongoose";
import { socketServer } from "./lib/socket";
import config from "./config";

let server: any;

// Main function to bootstrap the application
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log("✅ Connected to MongoDB");

    // Start server with Socket.IO integration
    server = socketServer.listen(config.port, () => {
      console.log(`🚀 Server is running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

// Initialize application
main();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("❌ Unhandled Rejection detected:", err);
  if (server) {
    server.close(() => {
      console.log("💀 Server is shutting down due to unhandled rejection");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("❌ Uncaught Exception detected:", err);
  process.exit(1);
});
