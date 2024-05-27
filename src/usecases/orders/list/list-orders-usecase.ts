import { IOrdersModel } from "@/database/models/Orders";
import { IResponseListOrder } from "@/dtos/order-relationsDTO";
import { IImageRepository } from "@/repositories/interfaces/interface-images-repository";
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository";

export class ListOrdersUseCase {
  constructor(
    private orderRepository: IOrdersRepository,
    private imagesRepository: IImageRepository
  ) {}

  async execute(): Promise<IResponseListOrder[]> {
    let listOrderFormatted: IResponseListOrder[] = []

    // listar os pedidos
    const orders = await this.orderRepository.list()
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
        status: order.status,
        urlJSON: order.urlJSON,
        nameJSON: order.nameJSON,
        images: images.map(image => image.url),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      })
      
    }
    // retornar o pedido
    return listOrderFormatted
  }
}