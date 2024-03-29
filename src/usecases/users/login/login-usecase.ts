import { IUserModel } from "@/database/models/Users";
import { env } from "@/env";
import { IDateProvider } from "@/providers/DateProvider/interface-date-provider";
import { ITokensRepository } from "@/repositories/interfaces/interface-tokens-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";
import { compare } from "bcrypt";
import 'dotenv/config'
import jwt from 'jsonwebtoken'

interface IRequestLoginAccount {
    email: string,
    password: string,
}
interface IResponseLoginAccount {
    accessToken: string
    refreshToken: string
    user: IUserModel
}

export class LoginUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokensRepository: ITokensRepository,
        private dayjsDateProvider: IDateProvider
    ) {}

    async execute({
        email,
        password
    }:IRequestLoginAccount):Promise<IResponseLoginAccount>{
        const findUserExists = await this.usersRepository.findByEmail(email)
        
        if(!findUserExists){
            throw new AppError('Usuário ou senha incorretos', 401)
        }

        // comparar senha
        const passwordMatch = await compare(password, findUserExists.password as string)

        if(!passwordMatch){
            throw new AppError('Usuário ou senha incorretos', 401)
        }
       
        // Criar access token
        const accessToken = jwt.sign({}, env.JWT_SECRET_ACCESS_TOKEN, {
            subject: findUserExists.id,
            expiresIn: env.JWT_EXPIRES_IN_ACCESS_TOKEN
        }) 
       
        // Criar refresh token
        const refreshToken = jwt.sign({subject:findUserExists.id, email}, env.JWT_SECRET_REFRESH_TOKEN, {
            subject: findUserExists.id,
            expiresIn: env.JWT_EXPIRES_IN_REFRESH_TOKEN
        })

        // criar data de expiração do refresh token
        const expireDateRefreshToken = this.dayjsDateProvider.addDays(10)

        // Salvar refresh token no banco
        await this.usersTokensRepository.create({
            idUser: findUserExists.id,
            expireDate: expireDateRefreshToken,
            refreshToken,
        })

        const getSafeUser = await this.usersRepository.getUserSecurity(findUserExists.id) as IUserModel

        return {
            user: getSafeUser,
            accessToken,
            refreshToken,
        }
    }
}