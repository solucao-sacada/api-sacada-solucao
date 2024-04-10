import { IBudGetModel } from "@/database/models/Budgets";
import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestCreateBudget {
  idUser: string
  client: string
  emailClient: string          
  price: number

  aparador?: boolean
  selante?: boolean
  prolongador?: boolean
  chapaSuperior?: boolean
  chapaInferior?: boolean
  qtdAparador: number
  qtdProlongador: number
  qtdSelante: number
}

export class CreateBudgetsUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    private userRepository: IUsersRepository
    ) {}

  async execute({
    idUser,
    client,
    emailClient,
    price,
    aparador,
    selante,
    prolongador,
    qtdAparador,
    qtdProlongador,
    qtdSelante
  }:IRequestCreateBudget): Promise<IBudGetModel> {
    // buscar o usuario pelo id
    const findUserExist = await this.userRepository.findById(idUser)

    // verificar se o usuario existe
    if(!findUserExist) {
      throw new AppError('Usuário não encontrado', 404)
    }

    // criar o pedido
    const budget = await this.budgetRepository.create({
      idUser,
      client,
      emailClient,
      price,
      aparador,
      selante,
      prolongador,
      qtdAparador,
      qtdProlongador,
      qtdSelante  
    }) as IBudGetModel

    // retornar o pedido
    return budget
  }
}