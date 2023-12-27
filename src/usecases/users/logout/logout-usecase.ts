import 'dotenv/config'
import { IDateProvider } from '@/providers/DateProvider/interface-date-provider';
import { ICacheProvider } from '@/providers/CacheProvider/interface-cache';
import { ITokensRepository } from '@/repositories/interfaces/interface-tokens-repository';
import { AppError } from '@/usecases/errors/AppError';

interface IRequestLogout {
    token: string
    refreshToken: string
    idUser: string
}

export class LogoutUseCase{
    constructor(
        private usersTokensRepository: ITokensRepository,
        private cacheProvider: ICacheProvider,
        private dayjsDateProvider: IDateProvider
    ) {}

    async execute({
        token,
        refreshToken,
        idUser
    }:IRequestLogout):Promise<void>{
        const userToken = await this.usersTokensRepository.findByUserAndToken(idUser, refreshToken)

        if(!userToken){
            throw new AppError('Refresh token não encontrado', 404)
        }

        // deletar refresh token do banco de dados
        await this.usersTokensRepository.deleteById(userToken.id)
        //[x] adicionar token na blacklist
        await this.cacheProvider.addToBlackList(token)

        //[x] verificar se existe data de expiração no redi
        const dataExpirateClearBlackList = await this.cacheProvider.getDatesToDeleteBlackList()
        if(dataExpirateClearBlackList.length === 0){
            const newDateExpire = JSON.stringify(this.dayjsDateProvider.addDays(7))
           await this.cacheProvider.addNewDateToDeleteBlackList(newDateExpire)
        }
        const [newDateExpire] = await this.cacheProvider.getDatesToDeleteBlackList()
        const dataExpirate = new Date(JSON.parse(newDateExpire))
        const dateNow = this.dayjsDateProvider.dateNow()
        const verifyExpireDate = this.dayjsDateProvider.compareIfBefore(dateNow, dataExpirate)

       if(!verifyExpireDate){
           await this.cacheProvider.clearBlackList()
           await this.cacheProvider.resetDatesToDeleteBlackList()
       }
    }
}