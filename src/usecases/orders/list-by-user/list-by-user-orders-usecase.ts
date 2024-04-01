import { IImageModel } from "@/database/models/Images";
import { IOrdersModel } from "@/database/models/Orders";
import { Accessories, Balcony, Client } from "@/dtos/ITypeOrderJSON";
import { IImageRepository } from "@/repositories/interfaces/interface-images-repository";
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";
import { ObjectId } from "mongoose";

interface IRequestListOrder {
  idUser: string
}

interface IResponseListOrder {
    _id: string;
    idUser: ObjectId;
    code: number;
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
    observation?: string
    images: string[]
}

export class ListOrdersByUserUseCase {
  constructor(
    private orderRepository: IOrdersRepository,
    private userRepository: IUsersRepository,
    private imagesRepository: IImageRepository
  ) {}

  async execute({
    idUser
  }:IRequestListOrder): Promise<IResponseListOrder[]> {
    // buscar o usuario pelo id
    const findUser = await this.userRepository.findById(idUser)

    // verificar se o usuario existe
    if(!findUser){
      throw new AppError("Usuário não encontrado", 404)
    }

    let listOrderFormatted: IResponseListOrder[] = []

    // listar os pedidos
    const orders = await this.orderRepository.listByUser(idUser)

    for(let order of orders){
      const images = await this.imagesRepository.listByOrder(order.id)
      listOrderFormatted.push({
        _id: order._id,
        code: order.code,
        idUser: order.idUser,
        accessories: order.accessories,
        balcony: order.balcony,
        client: order.client,
        technician: order.technician,
        observation: order.observation,
        images: images.map(image => image.url)
      })
      
    }

    // retornar o pedido
    return listOrderFormatted
  }
}