
interface IRequestListImages{
    idUser: string
}

export class ListImageByUserUseCase {
    constructor(
        private imageRepository: IImagesRepository,
        private userRepository: IUsersRepository
        ) {}

    async execute({
        idUser
    }:IRequestListImages): Promise<Image[]>{
        // buscar usuario pelo id
        const findUserExists = await this.userRepository.findById(idUser)

        // validar se usuario existe pelo id
        if(!findUserExists){
            throw new AppError('User not found', 404)
        }

        // list all images pelo id do usuario
        const images = await this.imageRepository.listByUser(idUser)

        // retornar lista de imagens
        return images
    }
}