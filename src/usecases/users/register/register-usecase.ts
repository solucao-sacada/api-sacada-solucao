import 'dotenv/config'
import { randomUUID } from "crypto";
import { IDateProvider } from "@/providers/DateProvider/interface-date-provider";
import { IMailProvider } from "@/providers/MailProvider/interface-mail-provider";
import { AppError } from "@/usecases/errors/AppError";
import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository';
import { IUserModel } from '@/database/models/Users';
import { ITokensRepository } from '@/repositories/interfaces/interface-tokens-repository';
import { hash } from 'bcrypt'
import { env } from '@/env';
interface IRequestRegisterAccount {
    email: string,
    name: string,
    password: string,
    phone?: string,
    image?: string,
    cpfCnpj: string,
    address?: {
        street: string;
        num: number
        district: string;
        city: string;
        state: string;
        country: string;
        zipCode: number
        complement?: string;
        reference?: string;
    }
}

export class RegisterUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private dayjsDateProvider: IDateProvider,
        private usersTokensRepository: ITokensRepository,
        private sendMailProvider: IMailProvider
    ) {}

    async execute({
        email,
        name,
        password,
        phone,
        cpfCnpj,
        image,
        address
    }:IRequestRegisterAccount):Promise<IUserModel>{
        const findEmailAlreadyExists = await this.usersRepository.findByEmail(email)

        if(findEmailAlreadyExists){
            throw new AppError('Email já cadastrado', 409)
        }

        const criptingPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            email,
            name,
            password: criptingPassword,
            phone,
            cpfCnpj,
            image,
        })
         // pegar template de verificaçao de email
         let pathTemplate = env.NODE_ENV === "development" ? 
         './views/emails/verify-email.hbs':
         './build/views/emails/verify-email.hbs' 
        
        // gerar token valido por 3h
        const token = randomUUID()
        console.log(token)
        // gerar data em horas
        const expireDateHours = this.dayjsDateProvider.addHours(3)

        // salvar token no banco
       await this.usersTokensRepository.create({
            idUser: user.id,
            expireDate: expireDateHours,
            refreshToken: token
        })
        // formatar link com token
        let link = env.NODE_ENV === "development" ?
        `${env.APP_URL_DEVLOPMENT}/users/verify-email?token=${token}`:
        `${env.APP_URL_PRODUCTION}/users/verify-email?token=${token}`

        // enviar verificação de email
        // await this.sendMailProvider.sendEmail(
        //     email, 
        //     name,
        //     "Confirmação de email", 
        //     link, 
        //     pathTemplate
        // )

        return user
    }
}