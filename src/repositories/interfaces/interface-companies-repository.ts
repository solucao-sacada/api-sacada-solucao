import { ICompanyModel } from "@/database/models/Companies"
import { ICompanyDTO } from "@/dtos/Company"

export interface ICompanyRepository {
    create(company: ICompanyDTO): Promise<ICompanyModel>
    findById(id: string): Promise<ICompanyModel | null>
    findByLegalName(legalName: string): Promise<ICompanyModel | null>
    findByTradingName(tradingName: string): Promise<ICompanyModel | null>
    findByCNPJ(cnpj: string): Promise<ICompanyModel | null>
    update(company: ICompanyDTO): Promise<ICompanyModel | null>
    delete(id: string): Promise<void>
}