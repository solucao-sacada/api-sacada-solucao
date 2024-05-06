import { IBudGetModel } from "@/database/models/Budgets";
import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestBudgets{
  idUser: string
}

export class ListBudgetsByClientUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    private userRepository: IUsersRepository
    ) {}

  async execute({
    idUser
  }: IRequestBudgets): Promise<IBudGetModel[]> {
    // buscar o usuário pelo id
    const findUser = await this.userRepository.findById(idUser)

    // verificar se o usuário existe
    if(!findUser){
      throw new AppError("Usuário não encontrado", 404)
    }

    // buscar todos os budgets
    const listBudgets = await this.budgetRepository.listByClient(idUser)

    // retorna todos os budgets
    return listBudgets
  }
}