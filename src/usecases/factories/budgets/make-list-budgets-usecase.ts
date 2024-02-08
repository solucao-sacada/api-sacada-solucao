import { MongooseBudgetRepository } from "@/repositories/mongoose/mongoose-budget-repository";
import { ListBudgetsUseCase } from "@/usecases/budgets/list/list-budgets-usecase";

export async function makeListBudget(): Promise<ListBudgetsUseCase> {
    const budgetRepository = new MongooseBudgetRepository()
    const listBudgetsUseCase = new ListBudgetsUseCase(
        budgetRepository,
    )

    return listBudgetsUseCase
}