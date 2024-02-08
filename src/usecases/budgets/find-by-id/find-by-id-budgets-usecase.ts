import { IBudGetModel } from "@/database/models/Budgets";
import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestFindBudget {
  id: string
}

export class FindBudgetsUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    ) {}

  async execute({
    id,
  }:IRequestFindBudget): Promise<IBudGetModel> {
    // buscar o budget pelo id
    const findBudgetExist = await this.budgetRepository.findById(id)

    // verificar se o budget existe
    if(!findBudgetExist) {
      throw new AppError('Orçamento não encontrado', 404)
    }

    // retorna o budget
    return findBudgetExist
  }
}