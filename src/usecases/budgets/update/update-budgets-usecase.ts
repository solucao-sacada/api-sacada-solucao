import { IBudGetModel } from "@/database/models/Budgets";
import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestUpdateBudget {
  id: string
  client: string
  emailClient: string  
}

export class UpdateBudgetsUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    ) {}

  async execute({
    id,
    client,
    emailClient,
  }:IRequestUpdateBudget): Promise<IBudGetModel> {
    // buscar o pedido pelo id
    const findBudgetExist = await this.budgetRepository.findById(id)

    // verificar se o pedido existe
    if(!findBudgetExist) {
      throw new AppError('Orçamento não encontrado', 404)
    }

    // atualizar  o pedido
    const budget = await this.budgetRepository.update({
      id,
      client,
      emailClient,
    }) as IBudGetModel

    // retornar o pedido
    return budget
  }
}