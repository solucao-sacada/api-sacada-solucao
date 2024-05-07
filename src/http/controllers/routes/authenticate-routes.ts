import { Router } from "express";
import { LoginUserController } from "../users/login/login-user-controller";
import { RefreshTokenController } from "../users/refresh-token/refresh-token-users-controller";
import { verifyTokenJWT } from "@/http/middlewares/verify-token-jwt";

export const authenticateRoutes = Router();

const loginController = new LoginUserController();

const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/login", loginController.handle);

authenticateRoutes.post("/refresh-token", verifyTokenJWT, refreshTokenController.handle);

