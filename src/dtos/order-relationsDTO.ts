import { IStatusDTO } from "./IStatusDTO";
import { Accessories, Balcony, Client } from "./ITypeOrderJSON";

export interface IResponseListOrder {
    _id: string;
    idUser: string;
    code: number;
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
    observation?: string
    status?: IStatusDTO
    urlJSON?: string
    nameJSON?: string
    images: string[]
    createdAt: Date
    updatedAt: Date
}