import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface"
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface"
import { IImagesRepository } from "@/repositories/interface-images-repository"
import { AppError } from "@/usecases/errors/app-error"

interface IRequestDeleteImages{
    id: string
}

export class DeleteImageUseCase {
    constructor(
        private imageRepository: IImagesRepository,
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

        // deletar imagens no firebase storage
        await this.storageProvider.deleteFile(findImageExists.name, 'campings')

        // deletar imagen local no tmp
        this.fileProvider.deleteFileTmp(findImageExists.name, 'campings')

        // deletar image pelo id
        await this.imageRepository.deleteById(id)
    }
}