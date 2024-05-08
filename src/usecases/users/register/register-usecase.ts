import 'dotenv/config'
import { randomUUID } from "crypto";
import { IDateProvider } from "@/providers/DateProvider/interface-date-provider";
import { IMailProvider } from "@/providers/MailProvider/interface-mail-provider";
import { AppError } from "@/usecases/errors/AppError";
import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository';
import { ITokensRepository } from '@/repositories/interfaces/interface-tokens-repository';
import { hash } from 'bcrypt'
import { env } from '@/env';
import { ICompanyRepository } from '@/repositories/interfaces/interface-companies-repository';
import { ICompanyModel } from '@/database/models/Companies';
interface IRequestRegisterAccount {
    email: string,
    name: string,
    password: string,
    phone?: string,
    image?: string,
    company:{
        cnpj: string,
        tradingName: string	
        legalName: string	
        stateRegistration: string	
        streetAddress: string	
        num: number
        complement: string	
        zipCode: number	
        neighborhood: string	
        city: string	
        state: string
    }	
}

interface IResponseCreateUser{
    user: {
        id: string,
        email: string,
        name: string,
        phone: string,
        image: string
        company: ICompanyModel
    }
}

export class RegisterUseCase{
    constructor(
        private usersRepository: IUsersRepository,
        private dayjsDateProvider: IDateProvider,
        private usersTokensRepository: ITokensRepository,
        private companyRepository: ICompanyRepository,
        private sendMailProvider: IMailProvider
    ) {}

    async execute({
        email,
        name,
        password,
        phone,
        image,
        company
    }:IRequestRegisterAccount):Promise<void>{
        const findEmailAlreadyExists = await this.usersRepository.findByEmail(email)

        if(findEmailAlreadyExists){
            throw new AppError('Email já cadastrado', 409)
        }

        const criptingPassword = await hash(password, 8)

        // buscar company por tranding name
        const findCompanyTradingName = await this.companyRepository.findByTradingName(company.tradingName)

        if(findCompanyTradingName){
            throw new AppError('Razão social ja cadastrada', 409)
        }

        const findCompanyCpnj = await this.companyRepository.findByCNPJ(company.cnpj)

        if(findCompanyCpnj){
            throw new AppError('CNPJ ja cadastrado', 409)
        }

        const findCompanyLegalName = await this.companyRepository.findByLegalName(company.tradingName)

        if(findCompanyLegalName){
            throw new AppError('Razão social já cadastrado', 409)
        }

        const user = await this.usersRepository.create({
            email,
            name,
            password: criptingPassword,
            phone,
            image,
        })

        const createCompany = await this.companyRepository.create({
            city: company.city,
            complement: company.complement,
            cnpj: company.cnpj,
            legalName: company.legalName,
            neighborhood: company.neighborhood,
            num: company.num,
            state: company.state,
            stateRegistration: company.stateRegistration,
            streetAddress: company.streetAddress,
            tradingName: company.tradingName,
            zipCode: company.zipCode,
            idUser: user.id
        })
      
        // gerar token valido por 3h
        const token = randomUUID()
        // gerar data em horas
        const expireDateHours = this.dayjsDateProvider.addHours(3)

        // salvar token no banco
        await this.usersTokensRepository.create({
            idUser: user.id,
            expireDate: expireDateHours,
            token
        })
         // enviar email de verificação
        // formatar link com token
        // const link =
        // env.NODE_ENV === 'development'
        // ? `${env.APP_URL_FRONTEND_DEVELOPMENT}/verification/${token}/${email}`
        // : `${env.APP_URL_FRONTEND_PRODUCTION}/verification/${token}/${email}`

        // // pegar template de verificaçao de email
        // const pathTemplate =
        //     env.NODE_ENV === 'development'
        //     ? './views/emails/verify-email.hbs'
        //     : './build/views/emails/verify-email.hbs'

        // // enviar verificação de email
        // await this.sendMailProvider.sendEmail(
        //     email,
        //     user.name,
        //     'Confirmação de email',
        //     link,
        //     pathTemplate,
        //     null,
        // )
    }
}