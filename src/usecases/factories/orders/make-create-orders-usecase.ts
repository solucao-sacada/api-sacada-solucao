import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { CreateOrdersUseCase } from "@/usecases/orders/create/create-orders-usecase";

export async function makeCreateOrder(): Promise<CreateOrdersUseCase> {
    const orderRepository = new MongooseOrdersRepository()
    const userRepository = new MongooseUsersRepository()
    const createOrdersUseCase = new CreateOrdersUseCase(
        orderRepository,
        userRepository
    )

    return createOrdersUseCase
}