import { IImageModel } from "@/database/models/Images"
import { env } from "@/env"
import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface"
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface"
import { IImageRepository } from "@/repositories/interfaces/interface-images-repository"
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository"
import { AppError } from "@/usecases/errors/AppError"
import { makeCompressionImage } from "@/utils/comprresion-image"

interface IRequestUploadImage{
    idUser: string
    imageInfo: {
        name: string
        hashName: string
    }
}

export class UploadImageToUserUseCase {
    constructor(
        private storageProvider: IStorageProvider,
        private imageRepository: IImageRepository,
        private usersRepository: IUsersRepository,
        private fileProvider: IFileProvider
        ) {}

    async execute({
        idUser,
        imageInfo
    }: IRequestUploadImage): Promise<IImageModel>{
        const findUserExists = await this.usersRepository.findById(idUser)
        
        if(!findUserExists){
            throw new AppError('Usuário não encontrado', 404)
        }

        // criar constante com o caminho da pasta de imagens
        const pathFolder = env.NODE_ENV === "production" ? `${env.FOLDER_TMP_PRODUCTION}` : `${env.FOLDER_TMP_DEVELOPMENT}`

        // comprimir a imagem antes de fazer upload usando o sharp
        // para diminuir a qualidade da imagem
        await makeCompressionImage(imageInfo.hashName, pathFolder, 'users')

        // criar for para fazer upload de mais de uma imagem no firebase storage
        // e salvar cada url na tabela de imagens
        // fazer upload do exame dentro firebase através do nome do arquivo
        let imageUrl = await this.storageProvider.uploadFile(imageInfo.hashName, `${pathFolder}/users`, 'users') as string

        // criar imagem no banco de dados
        const createImage = await this.imageRepository.upload({
        idUser,
        name: imageInfo.name,
        hashName: imageInfo.hashName,
        url: imageUrl
        })

        // deletar imagem não comprimida na tmp
        this.fileProvider.deleteFileTmp(imageInfo.hashName as string, 'tmp')

        // retornar array de imagens
        return createImage
    }
}