import { MongooseImagesRepository } from "@/repositories/mongoose/mongoose-images-repository";
import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { ListOrdersByUserUseCase } from "@/usecases/orders/list-by-user/list-by-user-orders-usecase";

export async function makeListOrderByUser(): Promise<ListOrdersByUserUseCase> {
    const orderRepository = new MongooseOrdersRepository()
    const userRepository = new MongooseUsersRepository()
    const imageRepository = new MongooseImagesRepository()
    const listOrdersByUserUseCase = new ListOrdersByUserUseCase(
        orderRepository,
        userRepository,
        imageRepository
    )

    return listOrdersByUserUseCase
}