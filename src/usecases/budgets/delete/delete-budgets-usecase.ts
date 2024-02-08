import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestDeleteBudget {
  id: string
}

export class DeleteBudgetsUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    ) {}

  async execute({
    id,
  }:IRequestDeleteBudget): Promise<void> {
    // buscar o budget pelo id
    const findBudgetExist = await this.budgetRepository.findById(id)

    // verificar se o budget existe
    if(!findBudgetExist) {
      throw new AppError('Orçamento não encontrado', 404)
    }

    // deleta o budget
    await this.budgetRepository.delete(id)
  }
}