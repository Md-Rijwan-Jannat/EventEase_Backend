/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";

const app: Application = express();

// Middleware parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// Application routes
app.use("/api/v1", router);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Event Ease server is running");
});

// Global error handler
app.use(globalErrorHandler);

// 404 middleware
app.use(notFound);

export default app;
