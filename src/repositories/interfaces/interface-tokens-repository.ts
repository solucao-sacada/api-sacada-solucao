import { ITokensModel } from "@/database/models/Tokens"
import { ITokenDTO } from "@/dtos/ITokenDTO"

export interface ITokensRepository {
    create(data:ITokenDTO):Promise<ITokensModel>
    findByToken(token:string):Promise<ITokensModel | null>
    findByUserId(idUser:string):Promise<ITokensModel | null>
    findByUserAndToken(idUser:string, token:string):Promise<ITokensModel | null>
    deleteById(id:string):Promise<void>
}