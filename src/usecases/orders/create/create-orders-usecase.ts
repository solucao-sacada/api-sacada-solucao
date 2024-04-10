import { IOrdersModel } from "@/database/models/Orders";
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
    private storageProvider: IStorageProvider,
    private fileProvider: IFileProvider
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

    const jsonName = `${randomUUID()}-order.json`
    const jsonPath = env.NODE_ENV === "development" ? env.APP_URL_DEVLOPMENT as string : env.APP_URL_PRODUCTION as string

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

    order.save()

    // deletar o arquivo temporário
    this.fileProvider.deleteFileTmp(jsonName, "json", jsonPath)

    // retornar o pedido
    return order
  }
}