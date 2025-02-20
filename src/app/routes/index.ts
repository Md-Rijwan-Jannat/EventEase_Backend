import { Router } from "express";
import { AuthRoutes } from "../module/Auth/auth.routes";
import { UserRoutes } from "../module/User/user.routes";
import { EventRoutes } from "../module/Event/event.routes";
import { NotificationRoutes } from "../module/Notification/notification.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/events",
    route: EventRoutes,
  },
  {
    path: "/notifications",
    route: NotificationRoutes,
  },
];

// This will automatically loop your routes that you will add in the moduleRoutes array
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
