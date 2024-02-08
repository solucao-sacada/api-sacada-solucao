import { IBudGetModel } from "@/database/models/Budgets"
import { IBudgetDTO } from "@/dtos/IBudget"

export interface IBudgetRepository{
    create(budget: IBudgetDTO): Promise<IBudGetModel>
    update(budget: IBudgetDTO): Promise<IBudGetModel | null>
    delete(id: string): Promise<void>
    list(): Promise<IBudGetModel[] | []>
    findById(id: string): Promise<IBudGetModel | null>
    // listByCliente(client: string): Promise<IBudGetModel[]>
    // findByUser(idUser: string): Promise<IBudgetDTO[]>
    // findByClient(client: string): Promise<IBudgetDTO[]>
    // findByEmail(email: string): Promise<IBudgetDTO[]>
}