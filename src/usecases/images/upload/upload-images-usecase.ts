import { env } from "@/env"
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface"

interface IRequestUploadImage{
    idUser: string
    names: string[]
}

export class UploadImageUseCase {
    constructor(
        private storageProvider: IStorageProvider,
        private userRepository: IUsersRepository,
        private imageRepository: IImagesRepository,
        ) {}

    async execute({
        idUser,
        names,
    }: IRequestUploadImage): Promise<Image[]>{
        // buscar usuario pelo id
        const findUserExists = await this.userRepository.findById(idUser)

        // verificar se existe usuario
        if(!findUserExists){
            throw new AppError('User not found', 404)
        }

        // criar constante com o caminho da pasta de imagens
        const pathFolder = env.NODE_ENV === "production" ? `${env.FOLDER_TMP_PRODUCTION}` : `${env.FOLDER_TMP_DEVELOPMENT}`

        // lista de imagens
        let arrayImagesUploaded: Image[] = []
        // criar for para fazer upload de mais de uma imagem no firebase storage
        // e salvar cada url na tabela de imagens
        for(let name of names){
            // fazer upload do exame dentro firebase através do nome do arquivo
            let imageUrl = await this.storageProvider.uploadFile(name, pathFolder, 'uploads') as string

            // criar imagem no banco de dados
            const image = await this.imageRepository.upload({
                idUser,
                name,
                url: imageUrl
            })

            // adicionar imagem no array de imagens
            arrayImagesUploaded.push(image)
        }

        // retornar array de imagens
        return arrayImagesUploaded
    }
}