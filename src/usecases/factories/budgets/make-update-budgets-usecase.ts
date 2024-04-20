import { MongooseBudgetRepository } from "@/repositories/mongoose/mongoose-budget-repository";
import { UpdateBudgetsUseCase } from "@/usecases/budgets/update/update-budgets-usecase";

export async function makeUpdateBudget(): Promise<UpdateBudgetsUseCase> {
    const budgetRepository = new MongooseBudgetRepository()
    const updateBudgetsUseCase = new UpdateBudgetsUseCase(
        budgetRepository,
    )

    return updateBudgetsUseCase
}