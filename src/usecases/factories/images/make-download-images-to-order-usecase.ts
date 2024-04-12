import { FirebaseStorageProvider } from "@/providers/StorageProvider/implementations/firebase-storage.provider";
import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { DownloadJSONUseCase } from "@/usecases/orders/download/download-orders-usecase";

export async function makeDownloadJSON(): Promise<DownloadJSONUseCase> {
    const storageProvider = new FirebaseStorageProvider()
    const ordersRepository = new MongooseOrdersRepository();
    const downloadJSONUseCase = new DownloadJSONUseCase(
        storageProvider,
        ordersRepository,
    )

    return downloadJSONUseCase
}