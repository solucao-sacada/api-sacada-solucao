import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository'
import { AppError } from '@/usecases/errors/AppError'
import 'dotenv/config'

interface IRequestDeleteUser {
   id: string
}

export class DeleteUserUseCase{
    constructor(
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        id
    }:IRequestDeleteUser):Promise<void>{
        // encontrar usuario pelo id
        const findUserExist = await this.usersRepository.getUserSecurity(id)
        // validar se usuario existe
        if(!findUserExist){
            throw new AppError('Usuário não encontrado', 404)
        }
        // delete user
        await this.usersRepository.deleteById(findUserExist.id)
    }
}