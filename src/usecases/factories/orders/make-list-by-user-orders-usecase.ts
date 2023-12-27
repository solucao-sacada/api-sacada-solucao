import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { ListOrdersByUserUseCase } from "@/usecases/orders/list-by-user/list-by-user-orders-usecase";

export async function makeListOrderByUser(): Promise<ListOrdersByUserUseCase> {
    const orderRepository = new MongooseOrdersRepository()
    const userRepository = new MongooseUsersRepository()
    const listOrdersByUserUseCase = new ListOrdersByUserUseCase(
        orderRepository,
        userRepository
    )

    return listOrdersByUserUseCase
}