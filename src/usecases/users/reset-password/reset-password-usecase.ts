import 'dotenv/config'
import { IDateProvider } from "@/providers/DateProvider/interface-date-provider";
import { hash } from "bcrypt";
import { ITokensRepository } from "@/repositories/interfaces/interface-tokens-repository";
import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository';
import { AppError } from '@/usecases/errors/AppError';
import { IUserModel } from '@/database/models/Users';

interface IRequestResetPassword {
    token: string
    password: string
}

export class ResetPasswordUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokensRepository: ITokensRepository,
        private dayjsDateProvider: IDateProvider,
    ) {}

    async execute({
        token,
        password
    }:IRequestResetPassword):Promise<void>{
        // buscar token no banco
        const findToken = await this.usersTokensRepository.findByToken(token)

        // verifica se token foi encontrado
        if(!findToken){
            throw new AppError('Token não encontrado', 404)
        }

        // verificar se o token está expirado
        if  (
                this.dayjsDateProvider.compareIfBefore
                (
                    findToken.expireDate, 
                    this.dayjsDateProvider.dateNow()
                )
            )
            {
                throw new AppError('Token expirado', 401)
            }
        const userId = String(findToken.idUser)
        // buscar usuário no banco
        const user = await this.usersRepository.findById(userId) as IUserModel
        
        // criptografar senha
        const newPassword = await hash(password, 8)

        // chamar metodo de atualizar senha
        await this.usersRepository.changePassword(user.id, newPassword)
        
        // deletar token do banco
        await this.usersTokensRepository.deleteById(findToken.id)
    }
}