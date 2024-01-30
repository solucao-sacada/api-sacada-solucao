import { IImageModel } from "@/database/models/Images"
import { env } from "@/env"
import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface"
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface"
import { IImageRepository } from "@/repositories/interfaces/interface-images-repository"
import { IOrdersRepository } from "@/repositories/interfaces/interface-orders-repository"
import { AppError } from "@/usecases/errors/AppError"
import { makeCompressionImage } from "@/utils/comprresion-image"

interface IRequestUploadImage{
    idOrder: string
    imageInfo: {
        name: string
        hashName: string
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
        const findOrderExists = await this.ordersRepository.findById(idOrder)
        
        if(!findOrderExists){
            throw new AppError('Pedido não encontrado', 404)
        }

        // criar constante com o caminho da pasta de imagens
        const pathFolder = env.NODE_ENV === "production" ? `${env.FOLDER_TMP_PRODUCTION}` : `${env.FOLDER_TMP_DEVELOPMENT}`

        // lista de imagens
        let arrayImagesUploaded: IImageModel[] = []
        // criar for para fazer upload de mais de uma imagem no firebase storage
        // e salvar cada url na tabela de imagens
        for(let image of imageInfo){
            // comprimir a imagem antes de fazer upload usando o sharp
            // para diminuir a qualidade da imagem
            await makeCompressionImage(image.hashName, pathFolder, 'orders')

            // fazer upload do exame dentro firebase através do nome do arquivo
            let imageUrl = await this.storageProvider.uploadFile(image.hashName, `${pathFolder}/orders`, 'orders') as string

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
            this.fileProvider.deleteFileTmp(image.hashName as string, 'tmp')
        }
        
        

        // retornar array de imagens
        return arrayImagesUploaded
    }
}