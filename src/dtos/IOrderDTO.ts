import { IOrdersModel } from "@/database/models/Orders"
import { IStatusDTO } from "./IStatusDTO"
import { Accessories, Balcony, Client } from "./ITypeOrderJSON"
import { IImageModel } from "@/database/models/Images"

export interface IOrderDTO {
    id: string
    idUser: string
    code?: number
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
    observation?: string
    status?: IStatusDTO
    urlJSON?: string
    images: string[]
}