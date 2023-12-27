import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { ListOrdersUseCase } from "@/usecases/orders/list/list-orders-usecase";

export async function makeListOrder(): Promise<ListOrdersUseCase> {
    const orderRepository = new MongooseOrdersRepository()
    const listOrdersUseCase = new ListOrdersUseCase(
        orderRepository,
    )

    return listOrdersUseCase
}