import { IOrdersModel } from "@/database/models/Orders";
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository";

export class ListOrdersUseCase {
  constructor(
    private orderRepository: IOrdersRepository,
  ) {}

  async execute(): Promise<IOrdersModel[]> {
    // listar os pedidos
    const orders = await this.orderRepository.list()

    // retornar o pedido
    return orders
  }
}