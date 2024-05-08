import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { authenticateRoutes } from "./authenticate-routes";
import { ordersRoutes } from "./orders-routes";
import { imagesRoutes } from "./images-routes";
import { budgetsRoutes } from "./budgets-routes";
import { companiesRoutes } from "./company-routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);
router.use("/images", imagesRoutes)
router.use("/budgets", budgetsRoutes)
router.use("/companies", companiesRoutes);

router.use(authenticateRoutes);
