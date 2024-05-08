import { MongooseCompanyRepository } from "@/repositories/mongoose/mongoonse-company-repository";
import { FindCompanyUseCase } from "@/usecases/companys/find-by-id/delete-company-usecase";

export async function makeFindCompany(): Promise<FindCompanyUseCase> {
    const companyRepository = new MongooseCompanyRepository();
    const findCompanyUseCase = new FindCompanyUseCase(companyRepository)
    
    return findCompanyUseCase
}