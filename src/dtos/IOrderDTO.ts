import { IStatusDTO } from "./IStatusDTO"
import { Accessories, Balcony, Client } from "./ITypeOrderJSON"

export interface IOrderDTO {
    id?: string
    idUser?: string
    code?: string
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
    observation?: string
    status?: IStatusDTO
    urlJSON?: string
    nameJSON?: string
    images?: string[]
}