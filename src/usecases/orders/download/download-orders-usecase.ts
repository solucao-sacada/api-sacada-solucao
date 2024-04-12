import { IImageModel } from "@/database/models/Images"
import { IOrdersModel } from "@/database/models/Orders"
import { IOrderDTO } from "@/dtos/IOrderDTO"
import { env } from "@/env"
import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface"
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface"
import { IImageRepository } from "@/repositories/interfaces/interface-images-repository"
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository"
import { AppError } from "@/usecases/errors/AppError"
import { makeCompressionImage } from "@/utils/comprresion-image"
import { randomUUID } from "crypto"
import * as fs from 'fs'

interface IRequestUploadFile{
    idOrder: string
}

export class DownloadJSONUseCase {
    constructor(
        private storageProvider: IStorageProvider,
        private ordersRepository: IOrdersRepository,
        ) {}

    async execute({
        idOrder
    }: IRequestUploadFile): Promise<Buffer>{
        const findExistImage = await this.ordersRepository.findById(idOrder)

        if(!findExistImage){
            throw new AppError('Imagem não encontrada', 404)
        }
        
        const file = await this.storageProvider.downloadFile(findExistImage.nameJSON as string)

        return file
    }
}