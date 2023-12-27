import { IOrdersModel } from "@/database/models/Orders"
import { IOrderDTO } from "@/dtos/IOrderDTO"

export interface IOrdersRepository {
    create(date: IOrderDTO): Promise<IOrdersModel>
    list(): Promise<IOrdersModel[]>
    listByUser(idUsers: string): Promise<IOrdersModel[]>
}