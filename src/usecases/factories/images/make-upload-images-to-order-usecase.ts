import { FileTMPProvider } from "@/providers/StorageProvider/implementations/file-tmp.provider";
import { FirebaseStorageProvider } from "@/providers/StorageProvider/implementations/firebase-storage.provider";
import { MongooseImagesRepository } from "@/repositories/mongoose/mongoose-images-repository";
import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { UploadImageToOrderUseCase } from "@/usecases/images/upload-to-order/upload-images-to-order-usecase";

export async function makeUploadImagesToOrder(): Promise<UploadImageToOrderUseCase> {
    const imageRepository = new MongooseImagesRepository()
    const storageProvider = new FirebaseStorageProvider()
    const ordersRepository = new MongooseOrdersRepository();
    const fileTMPProvider = new FileTMPProvider()
    const uploadImageToOrderUseCase = new UploadImageToOrderUseCase(
        storageProvider,
        imageRepository,
        ordersRepository,
        fileTMPProvider
    )

    return uploadImageToOrderUseCase
}