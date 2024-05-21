import { ICompanyModel } from "@/database/models/Companies";
import { IUserModel } from "@/database/models/Users";
import { env } from "@/env";
import { Role } from "@/http/middlewares/verify-token-jwt";
import { IDateProvider } from "@/providers/DateProvider/interface-date-provider";
import { ICompanyRepository } from "@/repositories/interfaces/interface-companies-repository";
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
    user: {
        id: string
        name: string
        email: string
        phone: string
        image: string
        role: string
        emailActive: boolean
        company: ICompanyModel
    }
}

export class LoginUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokensRepository: ITokensRepository,
        private dayjsDateProvider: IDateProvider,
        private companyRepository: ICompanyRepository,
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
            token: refreshToken
        })
        
        const getSafeUser = await this.usersRepository.getUserSecurity(findUserExists.id) as IUserModel
        const findCompany = await this.companyRepository.findByUser(getSafeUser.id) as ICompanyModel

        return {
            user: {
                id: findUserExists.id,
                email: findUserExists.email,
                name: findUserExists.name,
                phone: findUserExists.phone,
                image: findUserExists.image,
                emailActive: findUserExists.emailActive as boolean,
                role: findUserExists.role,
                company: {
                    id: findCompany.id,
                    cnpj: findCompany.cnpj,
                    tradingName: findCompany.tradingName,
                    legalName: findCompany.legalName,
                    stateRegistration: findCompany.stateRegistration,
                    streetAddress: findCompany.streetAddress,
                    num: findCompany.num,
                    complement: findCompany.complement,
                    zipCode: findCompany.zipCode,
                    neighborhood: findCompany.neighborhood,
                    city: findCompany.city,
                    state: findCompany.state
                } as ICompanyModel
            },
            accessToken,
            refreshToken,
        }
    }
}