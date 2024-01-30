import { FileTMPProvider } from "@/providers/StorageProvider/implementations/file-tmp.provider";
import { FirebaseStorageProvider } from "@/providers/StorageProvider/implementations/firebase-storage.provider";
import { MongooseImagesRepository } from "@/repositories/mongoose/mongoose-images-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { UploadImageToUserUseCase } from "@/usecases/images/upload-to-user/upload-images-to-user-usecase";

export async function makeUploadImagesToUser(): Promise<UploadImageToUserUseCase> {
    const imageRepository = new MongooseImagesRepository()
    const storageProvider = new FirebaseStorageProvider()
    const usersRepository = new MongooseUsersRepository()
    const fileTMPProvider = new FileTMPProvider()
    const uploadImageToUserUseCase = new UploadImageToUserUseCase(
        storageProvider,
        imageRepository,
        usersRepository,
        fileTMPProvider
    )

    return uploadImageToUserUseCase
}