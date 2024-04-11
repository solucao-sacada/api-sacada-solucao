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
        private fileProvider: IFileProvider,
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
        let arrayUrlImages: string[] = []
        // criar for para fazer upload de mais de uma imagem no firebase storage
        // e salvar cada url na tabela de imagens
        for(let image of imageInfo){
            if(!image.name.includes('.png') && !image.name.includes('.jpg') && !image.name.includes('.jpeg')){
                throw new AppError('Formato de imagem inválido', 400)
            }

            const formatName = `${image.hashName.replace(/\..+$/, ".webp")}`
            const formatHashName = `${image.hashName.replace(/\..+$/, ".webp")}`
            const formatPath = `${image.path}`.replace(/\..+$/, ".webp").replace("/tmp", "/tmp/orders")

            // fazer upload do exame dentro firebase através do nome do arquivo
            let imageUrl = await this.storageProvider.uploadFile(formatHashName, formatPath, 'orders') as string
            // criar imagem no banco de dados

            const createImage = await this.imageRepository.upload({
               idOrder,
               name: formatName,
               hashName: formatHashName,
               url: imageUrl
            })
 
            // adicionar imagem no array de imagens
            arrayImagesUploaded.push(createImage)
            arrayUrlImages.push(imageUrl)
            
            // deletar imagem não comprimida no tmp
            this.fileProvider.deleteFileTmp(image.hashName as string, image.destination)
            // deletar imagem comprimida no tmp
            this.fileProvider.deleteFileTmp(formatHashName, `${image.destination}/orders` )
        }

        let order: IOrderDTO = {
            id: findOrderExists._id,
            accessories: findOrderExists.accessories,
            balcony: findOrderExists.balcony,
            client: findOrderExists.client,
            code: findOrderExists.code,
            idUser: String(findOrderExists.idUser),
            observation: findOrderExists.observation as string,
            technician: findOrderExists.technician,
            status: findOrderExists.status,
            urlJSON: findOrderExists.urlJSON,
            images: arrayUrlImages
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

        // atualizar o pedido no banco de dados com a url do json
        await this.ordersRepository.update(order.id, order)

        // deletar o arquivo temporário
        this.fileProvider.deleteFileTmp(jsonName, `${jsonPath}/json`)

        // retornar array de imagens
        return arrayImagesUploaded
    }
}