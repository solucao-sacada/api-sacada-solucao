import { MailProvider } from "@/providers/MailProvider/implementations/provider-sendgrid";
import { FileTMPProvider } from "@/providers/StorageProvider/implementations/file-tmp.provider";
import { MongooseCompanyRepository } from "@/repositories/mongoose/mongoonse-company-repository";
import { MongooseBudgetRepository } from "@/repositories/mongoose/mongoose-budget-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { CreateBudgetsUseCase } from "@/usecases/budgets/create/create-budgets-usecase";

export async function makeCreateBudget(): Promise<CreateBudgetsUseCase> {
    const budgetRepository = new MongooseBudgetRepository()
    const userRepository = new MongooseUsersRepository()
    const sendGridProvider = new MailProvider()
    const fileProvider = new FileTMPProvider()
    const companyRepository = new MongooseCompanyRepository()

    const createBudgetsUseCase = new CreateBudgetsUseCase(
        budgetRepository,
        userRepository,
        sendGridProvider,
        fileProvider,
        companyRepository
    )

    return createBudgetsUseCase
}