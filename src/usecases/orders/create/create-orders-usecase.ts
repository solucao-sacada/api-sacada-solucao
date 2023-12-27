import { Accessories, Balcony, Client } from "@/@types/pedidoJson";
import { IOrdersModel } from "@/database/models/Orders";
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestCreateOrder {
  idUser: string
  accessories: Accessories
  balcony: Balcony
  client: Client
  technician: string
}

export class CreateOrdersUseCase {
  constructor(
    private orderRepository: IOrdersRepository,
    private userRepository: IUsersRepository
    ) {}

  async execute({
    idUser,
    accessories,
    balcony,
    client,
    technician
  }:IRequestCreateOrder): Promise<IOrdersModel> {
    // buscar o usuario pelo id
    const findUserExist = await this.userRepository.findById(idUser)

    // verificar se o usuario existe
    if(!findUserExist) {
      throw new AppError('Usuário não encontrado', 404)
    }

    // criar o pedido
    const order = await this.orderRepository.create({
      idUser,  
      accessories,
      balcony,
      client,
      technician,
    })

    // retornar o pedido
    return order
  }
}