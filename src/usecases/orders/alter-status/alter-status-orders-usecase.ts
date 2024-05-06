import { IOrdersModel } from "@/database/models/Orders";
import { IStatusDTO } from "@/dtos/IStatusDTO";
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestAlterStatusOrder {
  idOrder: string
  status: string
}

export class AlterStatusOrderUseCase {
  constructor(
    private orderRepository: IOrdersRepository,
    ) {}

  async execute({
    idOrder,
    status
  }: IRequestAlterStatusOrder): Promise<IOrdersModel> {
      // buscar o pedido pelo id
      const findOrderExist = await this.orderRepository.findById(idOrder)

      // verificar se o pedido existe
      if(!findOrderExist) {
        throw new AppError('Pedido não encontrado', 404)
      }

      // atualizar o pedido
      const order = await this.orderRepository.alterStatus(idOrder, status as IStatusDTO) as IOrdersModel

      // retornar o pedido
      return order
  }
}