import { MongooseOrdersRepository } from "@/repositories/mongoose/mongoose-orders-repository";
import { AlterStatusOrderUseCase } from "@/usecases/orders/alter-status/alter-status-orders-usecase";

export async function makeAlterStatusOrder(): Promise<AlterStatusOrderUseCase> {
    const orderRepository = new MongooseOrdersRepository()
    const alterStatusOrderUseCase = new AlterStatusOrderUseCase(
        orderRepository
    )

    return alterStatusOrderUseCase
}