import { FirebaseStorageProvider } from "@/providers/StorageProvider/implementations/firebase-storage.provider";
import { PrismaBoxRepository } from "@/repositories/prisma/prisma-boxes-repository";
import { PrismaCampingRepository } from "@/repositories/prisma/prisma-camping-repository";
import { PrismaImageRepository } from "@/repositories/prisma/prisma-images-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
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