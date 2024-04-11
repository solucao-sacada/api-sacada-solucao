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

interface IRequestUploadImage{
    idOrder: string
    fileName: string
}

export class UploadImageToOrderUseCase {
    constructor(
        private storageProvider: IStorageProvider,
        private imageRepository: IImageRepository,
        ) {}

    async execute({
        idOrder,
        fileName
    }: IRequestUploadImage): Promise<any>{
        const findExistImage = await this.imageRepository.findByHashName(fileName)
    }
}