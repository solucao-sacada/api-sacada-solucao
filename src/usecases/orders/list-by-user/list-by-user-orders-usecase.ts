import { IOrdersModel } from "@/database/models/Orders";
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestListOrder {
  idUser: string
}

export class ListOrdersByUserUseCase {
  constructor(
    private orderRepository: IOrdersRepository,
    private userRepository: IUsersRepository
  ) {}

  async execute({
    idUser
  }:IRequestListOrder): Promise<IOrdersModel[]> {
    // buscar o usuario pelo id
    const findUser = await this.userRepository.findById(idUser)

    // verificar se o usuario existe
    if(!findUser){
      throw new AppError("Usuário não encontrado", 404)
    }

    // listar os pedidos
    const orders = await this.orderRepository.listByUser(idUser)

    // retornar o pedido
    return orders
  }
}