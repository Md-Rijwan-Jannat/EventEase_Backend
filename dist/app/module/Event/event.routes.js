"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("./event.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const event_validation_1 = require("./event.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Create an event
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(event_validation_1.EventValidations.createEvent), event_controller_1.EventControllers.createEvent);
// Register a user to an event
router.post("/:eventId/register", (0, auth_1.default)(), event_controller_1.EventControllers.registerUserToEvent);
// Withdraw a user from an event
router.post("/:eventId/withdraw", (0, auth_1.default)(), event_controller_1.EventControllers.withdrawUserFromEvent);
// Get all events
router.get("/", (0, auth_1.default)(), event_controller_1.EventControllers.getAllMyEvents);
// Get all events without my event
router.get("/others", (0, auth_1.default)(), event_controller_1.EventControllers.getAllOtherEvents);
// Get a single event by ID
router.get("/:id", (0, auth_1.default)(), event_controller_1.EventControllers.getEventById);
// Update an event
router.patch("/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(event_validation_1.EventValidations.updateEvent), event_controller_1.EventControllers.updateEvent);
// Delete an event
router.delete("/:id", (0, auth_1.default)(), event_controller_1.EventControllers.deleteEvent);
exports.EventRoutes = router;
