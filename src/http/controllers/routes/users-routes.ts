import { Router } from "express";
import { FindUserController } from "../users/find/find-user-controller";
import { DeleteUserController } from "../users/delete/delete-user-controller";
import { RegisterUserController } from "../users/register/register-user-controller";
import { verifyTokenJWT } from "@/http/middlewares/verify-token-jwt";

export const usersRoutes = Router();

const registerUserController = new RegisterUserController();
const findUserByIdController = new FindUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post("/", registerUserController.handle);
usersRoutes.get("/:id", verifyTokenJWT, findUserByIdController.handle);
usersRoutes.delete("/:id", verifyTokenJWT, deleteUserController.handle);