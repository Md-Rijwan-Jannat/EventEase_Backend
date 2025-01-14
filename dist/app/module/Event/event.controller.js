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
exports.EventControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const event_service_1 = require("./event.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// Create a new event
const createEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_service_1.EventServices.createEvent(req.user.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Event created successfully",
        data: event,
    });
}));
// Register a user to an event
const registerUserToEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_service_1.EventServices.registerUserToEvent(req.user.id, req.params.eventId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User registered to event successfully",
        data: event,
    });
}));
// Withdraw a user from an event
const withdrawUserFromEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_service_1.EventServices.withdrawUserFromEvent(req.user.id, req.params.eventId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User withdrawn from event successfully",
        data: event,
    });
}));
// Get all events
const getAllMyEvents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_service_1.EventServices.getAllMyEvents(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My events retrieved successfully",
        data: events,
    });
}));
// Get all events
const getAllOtherEvents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_service_1.EventServices.getAllOtherEvents(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Other events retrieved successfully",
        data: events,
    });
}));
// Get an event by ID
const getEventById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_service_1.EventServices.getEventById(req.user.id, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event retrieved successfully",
        data: event,
    });
}));
// Update an event by ID
const updateEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield event_service_1.EventServices.updateEvent(req.user.id, req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event updated successfully",
        data: event,
    });
}));
// Delete an event by ID
const deleteEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield event_service_1.EventServices.deleteEvent(req.user.id, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event deleted successfully",
    });
}));
exports.EventControllers = {
    createEvent,
    registerUserToEvent,
    withdrawUserFromEvent,
    getAllMyEvents,
    getAllOtherEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};
