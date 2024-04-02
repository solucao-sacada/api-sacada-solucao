import { IImageModel } from "@/database/models/Images"
import { env } from "@/env"
import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface"
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface"
import { IImageRepository } from "@/repositories/interfaces/interface-images-repository"
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository"
import { AppError } from "@/usecases/errors/AppError"
import { makeCompressionImage } from "@/utils/comprresion-image"
import * as fs from 'fs'

interface IRequestUploadImage{
    idOrder: string
    imageInfo: {
        name: string
        hashName: string
        destination: string
        path: string
    }[]
}

export class UploadImageToOrderUseCase {
    constructor(
        private storageProvider: IStorageProvider,
        private imageRepository: IImageRepository,
        private ordersRepository: IOrdersRepository,
        private fileProvider: IFileProvider
        ) {}

    async execute({
        idOrder,
        imageInfo
    }: IRequestUploadImage): Promise<IImageModel[]>{
        // comprimir a imagem com o sharp antes de fazer upload no firebase
        const findOrderExists = await this.ordersRepository.findById(idOrder)
        
        if(!findOrderExists){
            throw new AppError('Pedido não encontrado', 404)
        }

        // lista de imagens
        let arrayImagesUploaded: IImageModel[] = []
        // criar for para fazer upload de mais de uma imagem no firebase storage
        // e salvar cada url na tabela de imagens
        for(let image of imageInfo){
            if(!image.name.includes('.png') && !image.name.includes('.jpg') && !image.name.includes('.jpeg')){
                throw new AppError('Formato de imagem inválido', 400)
            }

            // let formatHashName = image.hashName
            // let formatName = image.name
            // let formatPath = image.path
            
            // if(image.hashName.includes('.png')){
            //     formatHashName = `${image.hashName.replace(/\..+$/, ".webp")}`
            //     formatName = `${image.name.replace(/\..+$/, ".webp")}`
            //     formatPath = `${image.path.replace(/\..+$/, ".webp")}`
            //     formatPath = formatPath.replace("/tmp", "/tmp/orders");
            // }else if(image.hashName.includes('.jpg') || image.hashName.includes('.jpeg')){
            //     formatHashName = `${image.hashName.replace(/\..+$/, ".webp")}`
            //     formatName = `${image.name.replace(/\..+$/, ".webp")}`
            //     formatPath = `${image.path.replace(/\..+$/, ".webp")}`
            //     formatPath = formatPath.replace("/tmp", "/tmp/orders");
            // }

            // fazer upload do exame dentro firebase através do nome do arquivo
            let imageUrl = await this.storageProvider.uploadFile(image.hashName, image.path, 'orders') as string
            // criar imagem no banco de dados
            
            const createImage = await this.imageRepository.upload({
               idOrder,
               name: image.name,
               hashName: image.hashName,
               url: imageUrl
            })

            // adicionar imagem no array de imagens
            arrayImagesUploaded.push(createImage)

            // deletar imagem não comprimida no tmp
            this.fileProvider.deleteFileTmp(image.hashName as string, 'tmp', image.destination)
        }

        // retornar array de imagens
        return arrayImagesUploaded
    }
}