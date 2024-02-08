import { Router } from "express";
import { CreateOrderController } from "../orders/create/create-order-controller";
import { ListOrdersController } from "../orders/list/list-orders-controller";
import { ListOrdersByUserController } from "../orders/list-by-user/list-by-user-orders-controller";

export const ordersRoutes = Router();

const createOrderUserController = new CreateOrderController();
const listOrdersController = new ListOrdersController();
const listOrdersByUserController = new ListOrdersByUserController();

ordersRoutes.post("/", createOrderUserController.handle);

ordersRoutes.get("/", listOrdersController.handle);

ordersRoutes.get("/user/:id", listOrdersByUserController.handle);