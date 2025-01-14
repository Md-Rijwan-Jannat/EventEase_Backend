"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidations = void 0;
const zod_1 = require("zod");
const createEvent = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Event name is required"),
        date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
        location: zod_1.z.string().nonempty("Location is required"),
        maxAttendees: zod_1.z
            .number()
            .int()
            .positive("Max attendees must be a positive integer"),
    }),
});
const updateEvent = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        date: zod_1.z
            .string()
            .refine((val) => val !== undefined && !isNaN(Date.parse(val)), "Invalid date")
            .optional(),
        location: zod_1.z.string().optional(),
        maxAttendees: zod_1.z
            .number()
            .int()
            .positive("Max attendees must be a positive integer")
            .optional(),
    }),
});
exports.EventValidations = {
    createEvent,
    updateEvent,
};
