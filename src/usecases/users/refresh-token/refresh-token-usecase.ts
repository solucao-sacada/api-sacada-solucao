import 'dotenv/config'
import { IDateProvider } from "@/providers/DateProvider/interface-date-provider";
import { sign, verify } from "jsonwebtoken";
import { env } from "@/env";
import { ITokensRepository } from '@/repositories/interfaces/interface-tokens-repository';
import { AppError } from '@/usecases/errors/AppError';
import { IPayload } from '@/http/middlewares/verify-token-jwt';

interface IRequestRefreshToken {
    token: string
}

interface IResponseRefreshToken {
    refreshToken?: string
    accessToken: string
}

export class RefreshTokenUseCase{
    constructor(
        private usersTokensRepository: ITokensRepository,
        private dayjsDateProvider: IDateProvider,
    ) {}

    async execute({
        token,
    }:IRequestRefreshToken):Promise<IResponseRefreshToken>{
        const userToken = await this.usersTokensRepository.findByToken(token)

        if(!userToken){
            throw new AppError('Refresh token não encontrado', 404)
        }
        
        const verifyToken = this.dayjsDateProvider.compareIfBefore(
            userToken.expireDate,
            this.dayjsDateProvider.dateNow()
             
            );
        // verificar se o token está expirado
        if(verifyToken)
            {
                // deletar refresh token do banco de dados
                await this.usersTokensRepository.deleteById(userToken.id)
                // gerar um novo refresh token passando email no payload

                throw new AppError('Refresh token expirado', 401)
            }
       
        verify(token, env.JWT_SECRET_REFRESH_TOKEN) as IPayload;

        // criar novo access token
        const newAccessToken = sign({}, env.JWT_SECRET_ACCESS_TOKEN, {
            subject: userToken._id.toString(),
            expiresIn: env.JWT_EXPIRES_IN_ACCESS_TOKEN
        })
        
        // retornar o novo refresh token e o novo access token  
        return {
            accessToken: newAccessToken,
        }      
    }
}