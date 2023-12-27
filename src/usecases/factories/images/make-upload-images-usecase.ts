import { FirebaseStorageProvider } from "@/providers/StorageProvider/implementations/firebase-storage.provider";
import { UploadImageUseCase } from "@/usecases/images/upload/upload-images-usecase";

export async function makeUpload(): Promise<UploadImageUseCase> {
    const imageRepository = new PrismaImageRepository()
    const storageProvider = new FirebaseStorageProvider()
    const userRepository = new PrismaUsersRepository()
    const uploadImageUseCase = new UploadImageUseCase(
        storageProvider,
        userRepository,
        imageRepository
    )

    return uploadImageUseCase
}