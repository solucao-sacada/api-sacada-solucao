import { MongooseBudgetRepository } from "@/repositories/mongoose/mongoose-budget-repository";
import { DeleteBudgetsUseCase } from "@/usecases/budgets/delete/delete-budgets-usecase";

export async function makeDeleteBudget(): Promise<DeleteBudgetsUseCase> {
    const budgetRepository = new MongooseBudgetRepository()
    const deleteBudgetsUseCase = new DeleteBudgetsUseCase(
        budgetRepository,
    )

    return deleteBudgetsUseCase
}