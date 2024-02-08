import { IImageModel } from "@/database/models/Images"
import { IImageDTO } from "@/dtos/IImageDTO"

export interface IImageRepository{
    upload(data: IImageDTO):Promise<IImageModel>
    findById(id: string): Promise<IImageModel | null>
    listByOrder(idOrder: string): Promise<IImageModel[]>
    findByHashName(name: string): Promise<IImageModel | null>
    deleteById(id: string):Promise<void>  
}