import { MongooseBudgetRepository } from "@/repositories/mongoose/mongoose-budget-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { ListBudgetsByClientUseCase } from "@/usecases/budgets/list-by-client/list-by-client-budgets-usecase";

export async function makeListBudgetByClient(): Promise<ListBudgetsByClientUseCase> {
    const budgetRepository = new MongooseBudgetRepository()
    const userRepository = new MongooseUsersRepository()

    const listBudgetsByClientUseCase = new ListBudgetsByClientUseCase(
        budgetRepository,
        userRepository
    )

    return listBudgetsByClientUseCase
}