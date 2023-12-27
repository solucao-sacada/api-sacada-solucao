import { Accessories, Balcony, Client } from "@/@types/pedidoJson"

export interface IOrderDTO {
    idUser: string
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
}