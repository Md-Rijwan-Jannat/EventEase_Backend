"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../module/Auth/auth.routes");
const user_routes_1 = require("../module/User/user.routes");
const event_routes_1 = require("../module/Event/event.routes");
const notification_routes_1 = require("../module/Notification/notification.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/events",
        route: event_routes_1.EventRoutes,
    },
    {
        path: "/notifications",
        route: notification_routes_1.NotificationRoutes,
    },
];
// This will automatically loop your routes that you will add in the moduleRoutes array
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
