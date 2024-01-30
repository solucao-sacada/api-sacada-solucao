import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { authenticateRoutes } from "./authenticate-routes";
import { ordersRoutes } from "./orders-routes copy";
import { imagesRoutes } from "./images-routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);
router.use("/images", imagesRoutes)

router.use(authenticateRoutes);
