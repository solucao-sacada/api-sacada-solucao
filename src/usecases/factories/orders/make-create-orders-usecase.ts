import { FileTMPProvider } from "@/providers/StorageProvider/implementations/file-tmp.provider";
import { FirebaseStorageProvider } from "@/providers/StorageProvider/implementations/firebase-storage.provider";
import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { CreateOrdersUseCase } from "@/usecases/orders/create/create-orders-usecase";

export async function makeCreateOrder(): Promise<CreateOrdersUseCase> {
    const orderRepository = new MongooseOrdersRepository()
    const userRepository = new MongooseUsersRepository()
    const firebaseStorage  = new FirebaseStorageProvider()
    const fileProvider = new FileTMPProvider()
    const createOrdersUseCase = new CreateOrdersUseCase(
        orderRepository,
        userRepository,
        firebaseStorage,
        fileProvider
    )

    return createOrdersUseCase
}