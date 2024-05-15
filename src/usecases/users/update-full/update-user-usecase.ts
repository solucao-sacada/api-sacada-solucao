import { IUserModel } from '@/database/models/Users'
import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository'
import { AppError } from '@/usecases/errors/AppError'
import 'dotenv/config'

interface IRequestUpdateUser {
    id: string
    name: string
    email: string
    phone: string
}
interface IResponseUpdateUser {
    user: IUserModel
}

export class UpdateUserUseCase{
    constructor(
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        id,
        name,
        phone,
        email
    }:IRequestUpdateUser):Promise<IResponseUpdateUser>{
        const findUserExists = await this.usersRepository.getUserSecurity(id)
        if(!findUserExists){
            throw new AppError('Usuário não encontrado', 404)
        }
        
        const findEmailExist = await this.usersRepository.findByEmail(email)
        
        if(findEmailExist && findEmailExist.id !== findUserExists.id){
            throw new AppError('Email ja existe', 409)
        }

        const userUpdated = await this.usersRepository.updateById({
            id,
            name,
            phone,
            email,
        })
        console.log(userUpdated)
        return {
            user: {
                id: userUpdated.id,
                name: userUpdated.name,
                email: userUpdated.email,
                phone: userUpdated.phone,
                image: userUpdated.image
            } as IUserModel
        }
    }
}