import { Router } from "express";
import { FindUserController } from "../users/find/find-user-controller";
import { DeleteUserController } from "../users/delete/delete-user-controller";
import { RegisterUserController } from "../users/register/register-user-controller";
import { verifyTokenJWT } from "@/http/middlewares/verify-token-jwt";
import { EmailExistController } from "../users/email-exists/email-exists-user-controller";
import { ResetPasswordController } from "../users/reset-password/reset-password-user-controller";
import { SendForgotPasswordController } from "../users/send-forgot-password/send-forgot-password-user-controller";
import { SendVerificationEmailController } from "../users/send-verification-email/send-verification-email-user-controller";
import { UpdateUserController } from "../users/update/update-user-controller";
import { VerifyEmailController } from "../users/verify-email/verify-email-user-controller";
import { VerifyTokenIsExistsController } from "../users/verify-token-is-valid/verify-token-is-valid-users-controller";

export const usersRoutes = Router();

const registerUserController = new RegisterUserController();
const findUserByIdController = new FindUserController();
const deleteUserController = new DeleteUserController();
const emailExistController = new EmailExistController();
const resetPasswordController = new ResetPasswordController();
const sendForgotPasswordController = new SendForgotPasswordController();
const sendVerificationEmailController = new SendVerificationEmailController();
const updateUserController = new UpdateUserController();
const verifyEmailUser = new VerifyEmailController();
const veirifyTokenExistsController = new VerifyTokenIsExistsController();

usersRoutes.post("/", registerUserController.handle);
usersRoutes.get("/:id", verifyTokenJWT, findUserByIdController.handle);
usersRoutes.get("/verify-token/:token", veirifyTokenExistsController.handle)
usersRoutes.post("/send-verification-email/:email", sendVerificationEmailController.handle)
usersRoutes.delete("/:id", verifyTokenJWT, deleteUserController.handle);
usersRoutes.post("/email-exists", emailExistController.handle)
usersRoutes.patch("/reset-password", resetPasswordController.handle)
usersRoutes.post("/forgot-password", sendForgotPasswordController.handle)
usersRoutes.put("/", verifyTokenJWT, updateUserController.handle)
usersRoutes.patch("/verify-email", verifyEmailUser.handle)


