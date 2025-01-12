import { z } from "zod";

const createEvent = z.object({
  body: z.object({
    name: z.string().nonempty("Event name is required"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    location: z.string().nonempty("Location is required"),
    maxAttendees: z
      .number()
      .int()
      .positive("Max attendees must be a positive integer"),
  }),
});

const updateEvent = z.object({
  body: z.object({
    name: z.string().optional(),
    date: z
      .string()
      .refine(
        (val) => val !== undefined && !isNaN(Date.parse(val)),
        "Invalid date"
      )
      .optional(),
    location: z.string().optional(),
    maxAttendees: z
      .number()
      .int()
      .positive("Max attendees must be a positive integer")
      .optional(),
  }),
});

export const EventValidations = {
  createEvent,
  updateEvent,
};
