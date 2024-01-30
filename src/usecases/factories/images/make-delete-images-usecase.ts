import { FileTMPProvider } from "@/providers/StorageProvider/implementations/file-tmp.provider"
import { FirebaseStorageProvider } from "@/providers/StorageProvider/implementations/firebase-storage.provider"
import { MongooseImagesRepository } from "@/repositories/mongoose/mongoose-images-repository"
import { DeleteImageUseCase } from "@/usecases/images/delete/delete-images-usecase"

export async function makeDeleteImage(): Promise<DeleteImageUseCase> {
    const imageRepository = new MongooseImagesRepository()
    const storageProvider = new FirebaseStorageProvider()
    const fileTMPProvider = new FileTMPProvider()
    const deleteImageUseCase = new DeleteImageUseCase(
        imageRepository,
        storageProvider,
        fileTMPProvider
    )

    return deleteImageUseCase
}