import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface"
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface"
import { IImageRepository } from "@/repositories/interfaces/interface-images-repository"
import { AppError } from "@/usecases/errors/AppError"

interface IRequestDeleteImages{
    id: string
}

export class DeleteImageUseCase {
    constructor(
        private imageRepository: IImageRepository,
        private storageProvider: IStorageProvider,
        private fileProvider: IFileProvider
        ) {}

    async execute({
        id
    }:IRequestDeleteImages): Promise<void>{
        // buscar image pelo id
        const findImageExists = await this.imageRepository.findById(id)

        // validar se image existe pelo id
        if(!findImageExists){
            throw new AppError('Image not found', 404)
        }

        if(findImageExists.idUser){
            // deletar imagens no firebase storage
            await this.storageProvider.deleteFile(findImageExists.hashName as string, 'users')

            // deletar imagen local no tmp
            this.fileProvider.deleteFileTmp(findImageExists.hashName as string, 'users')

            // deletar image pelo id
            await this.imageRepository.deleteById(id)
        }

        if(findImageExists.idOrder){
            // deletar imagens no firebase storage
            await this.storageProvider.deleteFile(findImageExists.hashName as string, 'orders')

            // deletar imagen local no tmp
            this.fileProvider.deleteFileTmp(findImageExists.hashName as string, 'orders')

            // deletar image pelo id
            await this.imageRepository.deleteById(id)
        }
    }
}