import { IOrdersModel } from "@/database/models/Orders"
import { IOrderDTO } from "@/dtos/IOrderDTO"
import { IStatusDTO } from "@/dtos/IStatusDTO"

export interface IOrdersRepository {
    create(date: IOrderDTO): Promise<IOrdersModel>
    findById(id: string): Promise<IOrdersModel | null>
    list(): Promise<IOrdersModel[]>
    listByUser(idUsers: string): Promise<IOrdersModel[]>
    update(id: string, data?: IOrderDTO): Promise<IOrdersModel | null>
    alterStatus(idOrder: string, status: IStatusDTO): Promise<IOrdersModel | null>
}