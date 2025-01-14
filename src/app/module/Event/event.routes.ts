import express from "express";
import { EventControllers } from "./event.controller";
import validateRequest from "../../middlewares/validateRequest";
import { EventValidations } from "./event.validation";
import Auth from "../../middlewares/auth";

const router = express.Router();

// Create an event
router.post(
  "/",
  Auth(),
  validateRequest(EventValidations.createEvent),
  EventControllers.createEvent
);

// Register a user to an event
router.post("/:eventId/register", Auth(), EventControllers.registerUserToEvent);

// Withdraw a user from an event
router.post(
  "/:eventId/withdraw",
  Auth(),
  EventControllers.withdrawUserFromEvent
);

// Get all events
router.get("/", Auth(), EventControllers.getAllMyEvents);
// Get all events without my event
router.get("/other", Auth(), EventControllers.getAllOtherEvents);

// Get a single event by ID
router.get("/:id", Auth(), EventControllers.getEventById);

// Update an event
router.patch(
  "/:id",
  Auth(),
  validateRequest(EventValidations.updateEvent),
  EventControllers.updateEvent
);

// Delete an event
router.delete("/:id", Auth(), EventControllers.deleteEvent);

export const EventRoutes = router;
