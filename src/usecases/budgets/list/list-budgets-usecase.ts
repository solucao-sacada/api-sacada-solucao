import { IBudGetModel } from "@/database/models/Budgets";
import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";

export class ListBudgetsUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    ) {}

  async execute(): Promise<IBudGetModel[]> {
    // buscar todos os budgets
    const listBudgets = await this.budgetRepository.list()

    // retorna todos os budgets
    return listBudgets
  }
}