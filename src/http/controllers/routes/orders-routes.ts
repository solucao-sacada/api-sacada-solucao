import { Router } from "express";
import { CreateOrderController } from "../orders/create/create-order-controller";
import { ListOrdersController } from "../orders/list/list-orders-controller";
import { ListOrdersByUserController } from "../orders/list-by-user/list-by-user-orders-controller";
import { DowloadOrderJSONController } from "../orders/download/download-order-controller";

export const ordersRoutes = Router();

const createOrderUserController = new CreateOrderController();
const listOrdersController = new ListOrdersController();
const listOrdersByUserController = new ListOrdersByUserController();
const downloadOrderJSONController = new DowloadOrderJSONController();

ordersRoutes.post("/", createOrderUserController.handle);

ordersRoutes.get("/", listOrdersController.handle);

ordersRoutes.get("/user/:id", listOrdersByUserController.handle);

ordersRoutes.get("/download/:id", downloadOrderJSONController.handle);