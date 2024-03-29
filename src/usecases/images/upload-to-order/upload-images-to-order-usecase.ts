import { IImageModel } from "@/database/models/Images"
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

        console.log(JSON.stringify(imageInfo, null, 2))

        console.log('fazer upload da imagem')
        // lista de imagens
        let arrayImagesUploaded: IImageModel[] = []
        // criar for para fazer upload de mais de uma imagem no firebase storage
        // e salvar cada url na tabela de imagens
        for(let image of imageInfo){
            console.log('formatar nome da imagem')
            // const formatName = `${image.hashName.replace(/\..+$/, ".webp")}`

            // const x = fs.existsSync(`${image.destination}/${image.hashName}`)
            // console.log(x)

            // if(fs.existsSync(image.hashName)){}
            console.log(image.destination)
            console.log(image.hashName)

            console.log('fazer upload da imagem storage')
            // fazer upload do exame dentro firebase através do nome do arquivo
            let imageUrl = await this.storageProvider.uploadFile(image.hashName, `${image.destination}`, 'orders') as string
            // criar imagem no banco de dados
            console.log(imageUrl)
            
            // console.log('criar imagem info no banco')
            // const createImage = await this.imageRepository.upload({
            //    idOrder,
            //    name: image.name,
            //    hashName: image.hashName,
            //    url: imageUrl
            // })

            // // adicionar imagem no array de imagens
            // arrayImagesUploaded.push(createImage)

            // console.log('deleta imagem antiga no tmp')
            // // deletar imagem não comprimida no tmp
            // this.fileProvider.deleteFileTmp(image.hashName as string, 'tmp', image.destination)
        }

        // retornar array de imagens
        return arrayImagesUploaded
    }
}