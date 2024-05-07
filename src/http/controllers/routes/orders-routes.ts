import { Router } from "express";
import { CreateOrderController } from "../orders/create/create-order-controller";
import { ListOrdersController } from "../orders/list/list-orders-controller";
import { ListOrdersByUserController } from "../orders/list-by-user/list-by-user-orders-controller";
import { AlterStatusOrderController } from "../orders/alter-status/alter-status-order-controller";
import { verifyTokenJWT } from "@/http/middlewares/verify-token-jwt";
import { ensureAdmin } from "@/http/middlewares/verify-user-role";

export const ordersRoutes = Router();

const createOrderUserController = new CreateOrderController();
const listOrdersController = new ListOrdersController();
const listOrdersByUserController = new ListOrdersByUserController();
const alterStatusOrderController = new AlterStatusOrderController();

ordersRoutes.post("/", verifyTokenJWT, createOrderUserController.handle);

ordersRoutes.get("/", verifyTokenJWT, ensureAdmin, listOrdersController.handle);

ordersRoutes.get("/user/:id", verifyTokenJWT, listOrdersByUserController.handle);

ordersRoutes.patch("/status", verifyTokenJWT, ensureAdmin, alterStatusOrderController.handle);
