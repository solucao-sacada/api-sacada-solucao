import { MongooseBudgetRepository } from "@/repositories/mongoose/mongoose-budget-repository";
import { FindBudgetsUseCase } from "@/usecases/budgets/find-by-id/find-by-id-budgets-usecase";

export async function makeFindBudgetById(): Promise<FindBudgetsUseCase> {
    const budgetRepository = new MongooseBudgetRepository()
    const findBudgetsUseCase = new FindBudgetsUseCase(
        budgetRepository,
    )

    return findBudgetsUseCase
}