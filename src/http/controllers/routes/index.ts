import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { authenticateRoutes } from "./authenticate-routes";
import { ordersRoutes } from "./orders-routes copy";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);

router.use(authenticateRoutes);
