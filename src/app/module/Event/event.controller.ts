import { Request, Response } from "express";
import httpStatus from "http-status";
import { EventServices } from "./event.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Create a new event
const createEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await EventServices.createEvent(req.user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Event created successfully",
    data: event,
  });
});

// Register a user to an event
const registerUserToEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await EventServices.registerUserToEvent(
    req.user.id,
    req.params.eventId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered to event successfully",
    data: event,
  });
});

// Withdraw a user from an event
const withdrawUserFromEvent = catchAsync(
  async (req: Request, res: Response) => {
    const event = await EventServices.withdrawUserFromEvent(
      req.user.id,
      req.params.eventId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User withdrawn from event successfully",
      data: event,
    });
  }
);

// Get all events
const getAllMyEvents = catchAsync(async (req: Request, res: Response) => {
  const events = await EventServices.getAllMyEvents(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My events retrieved successfully",
    data: events,
  });
});

// Get an event by ID
const getEventById = catchAsync(async (req: Request, res: Response) => {
  const event = await EventServices.getEventById(req.user.id, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event retrieved successfully",
    data: event,
  });
});

// Update an event by ID
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const event = await EventServices.updateEvent(
    req.user.id,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event updated successfully",
    data: event,
  });
});

// Delete an event by ID
const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  await EventServices.deleteEvent(req.user.id, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully",
  });
});

export const EventControllers = {
  createEvent,
  registerUserToEvent,
  withdrawUserFromEvent,
  getAllMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
