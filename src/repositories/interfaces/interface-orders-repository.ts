import { IOrdersModel } from "@/database/models/Orders"
import { IOrderDTO } from "@/dtos/IOrderDTO"

export interface IOrdersRepository {
    create(date: IOrderDTO): Promise<IOrdersModel>
    findById(id: string): Promise<IOrdersModel | null>
    list(): Promise<IOrdersModel[]>
    listByUser(idUsers: string): Promise<IOrdersModel[]>
    update(id: string, data?: IOrderDTO): Promise<IOrdersModel | null>
}