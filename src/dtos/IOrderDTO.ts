import { Accessories, Balcony, Client } from "./ITypeOrderJSON"

export interface IOrderDTO {
    idUser: string
    code?: number
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
    observation?: string
}