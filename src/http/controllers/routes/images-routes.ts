import { Router } from "express";
import { tmpDirectoriesUploadConfig } from "@/config/upload-file";
import multer from "multer";
import { DeleteImageController } from "../images/delete/delete-images-controller";
import { UploadImageToOrderController } from "../images/upload/upload-images-to-order-controller";
import { UploadImageToUserController } from "../images/upload/upload-images-to-user-controller";

export const imagesRoutes = Router();

const { tmp } = tmpDirectoriesUploadConfig;

const uploadFile = multer(tmp);

const uploadImageToUserController = new UploadImageToUserController();

const uploadImageToOrderController = new UploadImageToOrderController();

const deleteImageController = new DeleteImageController();

imagesRoutes.post("/user/:idUser", uploadFile.single("image"), uploadImageToUserController.handle);

imagesRoutes.post("/order/:idOrder", uploadFile.array("images"), uploadImageToOrderController.handle);

imagesRoutes.delete("/delete/:id", deleteImageController.handle);