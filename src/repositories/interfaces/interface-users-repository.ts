import { IUserModel } from "@/database/models/Users"
import { IUserDTO } from "@/dtos/IUserDTO"

export interface IUsersRepository {
    create(data:IUserDTO): Promise<IUserModel>
    list(): Promise<IUserModel[]>
    findById(id:string): Promise<IUserModel | null>
    findByIdCostumerPayment(id:string): Promise<IUserModel | null>
    getUserSecurity(id:string): Promise<IUserModel | null>
    findByEmail(email:string): Promise<IUserModel | null>
    findByCPF(cpf:string): Promise<IUserModel | null>

    activeEmail(id:string, activate?: boolean): Promise<void | null>
    changePassword(id:string, password:string): Promise<void | null>
    updateById(data:IUserDTO): Promise<IUserModel>
    updateIdCompany(id:string, idCompany:string): Promise<void>
    updateIdCostumerPayment(idUser:string, idCustomerPayment:string): Promise<IUserModel> 
    turnAdmin(id:string): Promise<IUserModel | null>
    deleteById(id:string): Promise<void>
}