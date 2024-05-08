import { MongooseCompanyRepository } from "@/repositories/mongoose/mongoonse-company-repository";
import { DeleteCompanyUseCase } from "@/usecases/companys/delete/delete-company-usecase";

export async function makeDeleteCompany(): Promise<DeleteCompanyUseCase> {
    const companyRepository = new MongooseCompanyRepository();
    const deleteCompanyUseCase = new DeleteCompanyUseCase(companyRepository)

    return deleteCompanyUseCase
}