import { DeleteImageUseCase } from "@/usecases/images/delete/delete-images-usecase";

export async function makeDeleteImage(): Promise<DeleteImageUseCase> {
    const imageRepository = new PrismaImageRepository()
    const storageProvider = new FirebaseStorageProvider()
    const fileTMPProvider = new FileTMPProvider()
    const deleteImageUseCase = new DeleteImageUseCase(
        imageRepository,
        storageProvider,
        fileTMPProvider
    )

    return deleteImageUseCase
}