import { MongooseCompanyRepository } from "@/repositories/mongoose/mongoonse-company-repository"
import { UpdateCompanyUseCase } from "@/usecases/companys/update/update-company-usecase"

export async function makeUpdateCompany(): Promise<UpdateCompanyUseCase> {
    const companyRepository = new MongooseCompanyRepository()
    const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository) 

    return updateCompanyUseCase
}