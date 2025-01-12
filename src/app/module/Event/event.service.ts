import { Event } from "./event.model";
import { TEvent } from "./event.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../Auth/auth.model";

// Create a new event
const createEvent = async (createdBy: string, payload: TEvent) => {
  // Check if the user exists
  const isUserExists = await User.findById(createdBy);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check for duplicate event (same name, date, and location)
  const isEventExists = await Event.findOne({
    name: payload.name,
    date: payload.date,
    location: payload.location,
  });

  if (isEventExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "An event with the same name, date, and location already exists"
    );
  }

  // Check for duplicate event (same name on the same date)
  const isSameDateEventExists = await Event.findOne({
    name: payload.name,
    date: payload.date,
  });

  if (isSameDateEventExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "An event with the same name cannot be created on the same date"
    );
  }

  // Create the event
  const event = await Event.create({ ...payload, createdBy });
  return event;
};

// Register an attendee to an event
const registerUserToEvent = async (userId: string, eventId: string) => {
  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Todo make realtime using socket.io

  // Find the event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  // Check if the user is already registered
  if (event.attendees.includes(userId)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User is already registered for this event"
    );
  }

  // Check if the event has remaining spots
  if (event.maxAttendees <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Event is fully booked");
  }

  // Register the user
  event.attendees.push(userId);
  event.maxAttendees -= 1;

  // Save the updated event
  await event.save();

  return event;
};

// Withdraw an attendee from an event
const withdrawUserFromEvent = async (userId: string, eventId: string) => {
  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Todo make realtime using socket.io

  // Find the event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  // Check if the user is not registered
  if (!event.attendees.includes(userId)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User is not registered for this event"
    );
  }

  // Withdraw the user
  event.attendees = event.attendees.filter((id) => id !== userId);
  event.maxAttendees += 1;

  // Save the updated event
  await event.save();

  return event;
};

// Get all events
const getAllMyEvents = async (userId: string) => {
  const isUserExists = await User.findById(userId);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const events = await Event.find({ createdBy: userId }).populate("createdBy");

  if (!events) {
    throw new AppError(httpStatus.NOT_FOUND, "No events found in database");
  }

  return events;
};

// Get a single event by ID
const getEventById = async (userId: string, id: string) => {
  const isUserExists = await User.findById(userId);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const event = await Event.findById(id).populate("createdBy");

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "This event does not exist");
  }
  return event;
};

// Update an event by ID
const updateEvent = async (
  ownedBy: string,
  eventId: string,
  payload: Partial<TEvent>
) => {
  const isUserExists = await User.findById(ownedBy);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Todo: Socket.io realtime update

  const event = await Event.findByIdAndUpdate(eventId, payload, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }
  return event;
};

// Delete an event by ID
const deleteEvent = async (ownedBy: string, eventId: string) => {
  const isUserExists = await User.findById(ownedBy);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const event = await Event.findByIdAndDelete(eventId);

  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, "Event not found");
  }

  return event;
};

export const EventServices = {
  createEvent,
  registerUserToEvent,
  withdrawUserFromEvent,
  getAllMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
