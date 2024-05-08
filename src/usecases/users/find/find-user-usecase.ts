import { IUserModel } from '@/database/models/Users'
import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository'
import { AppError } from '@/usecases/errors/AppError'
import 'dotenv/config'

interface IRequestFindUser {
   id: string
}

export class FindUserUseCase{
    constructor(
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        id
    }:IRequestFindUser):Promise<IUserModel>{
        // encontrar usuario pelo id
        const findUserExist = await this.usersRepository.findById(id)

        // validar se usuario existe
        if(!findUserExist){
            throw new AppError('Usuário não encontrado', 404)
        }

        const getSafeUser = await this.usersRepository.getUserSecurity(findUserExist.id) as IUserModel

        // retornar usuario
        return getSafeUser
    }
}