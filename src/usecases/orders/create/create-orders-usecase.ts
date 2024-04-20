import { IOrdersModel } from "@/database/models/Orders";
import { IOrderDTO } from "@/dtos/IOrderDTO";
import { IStatusDTO } from "@/dtos/IStatusDTO";
import { Accessories, Balcony, Client } from "@/dtos/ITypeOrderJSON";
import { env } from "@/env";
import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface";
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface";
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";
import { randomUUID } from "node:crypto";
import fs from 'node:fs'

interface IRequestCreateOrder {
  idUser: string
  accessories: Accessories
  balcony: Balcony
  client: Client
  technician: string
  observation?: string
}

export class CreateOrdersUseCase {
  constructor(
    private orderRepository: IOrdersRepository,
    private userRepository: IUsersRepository,
    private fileProvider: IFileProvider,
    private storageProvider: IStorageProvider,
    
    ) {}

  async execute({
    idUser,
    accessories,
    balcony,
    client,
    technician,
    observation
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
      observation,
    })

    let orderJSON: IOrderDTO = {
      id: order._id,
      accessories: order.accessories,
      balcony: order.balcony,
      client: order.client,
      code: order.code,
      idUser: String(order.idUser),
      observation: order.observation as string,
      technician: order.technician,
      status: order.status,
    }


    const jsonName = `${randomUUID()}-order.json`
    const jsonPath = env.NODE_ENV === "development" ? './src/tmp' : './build/tmp'

    fs.writeFile(`${jsonPath}/json/${jsonName}`, JSON.stringify(order, null, 2), 'utf8', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Arquivo salvo com sucesso!');
    }
    });

    // subir o json para o firebase storage
    const urlJSON =await this.storageProvider.uploadFile(jsonName, `${jsonPath}/json/${jsonName}`, "jsons")
    
    order.urlJSON = urlJSON
    order.nameJSON = jsonName

    // atualizar o pedido no banco de dados com a url do json
    await this.orderRepository.update(order.id as string, orderJSON)

    // deletar o arquivo temporário
    this.fileProvider.deleteFileTmp(jsonName, `${jsonPath}/json`)

    // retornar o pedido
    return order
  }
}