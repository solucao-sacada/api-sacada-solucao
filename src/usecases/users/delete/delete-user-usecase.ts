import { ICompanyRepository } from '@/repositories/interfaces/interface-companies-repository'
import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository'
import { AppError } from '@/usecases/errors/AppError'
import 'dotenv/config'

interface IRequestDeleteUser {
   id: string
}

export class DeleteUserUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private companyRepository: ICompanyRepository
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

        // delete company
        await this.companyRepository.delete(findUserExist.idCompany as string)

        // delete user
        await this.usersRepository.deleteById(findUserExist.id)
    }
}