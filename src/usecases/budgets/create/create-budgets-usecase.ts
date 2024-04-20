import { IBudGetModel } from "@/database/models/Budgets";
import { env } from "@/env";
import { IMailProvider } from "@/providers/MailProvider/interface-mail-provider";
import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestCreateBudget {
  idUser: string
  client: string
  emailClient: string  

  area: number
  price: number
  pricePlates: number
  priceGlasses: number
  priceAcessories: number
  priceProlongador: number
  priceKitSolutions: number

  aparador?: boolean
  selante?: boolean
  prolongador?: boolean
  chapaSuperior: boolean 
  chapaInferior: boolean
  qtdAparador: number
  qtdProlongador: number
  qtdSelante: number  
}

export class CreateBudgetsUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
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
    qtdSelante,
    chapaInferior,
    chapaSuperior,
    area,
    pricePlates,
    priceGlasses,
    priceAcessories,
    priceKitSolutions,
    priceProlongador
  }:IRequestCreateBudget): Promise<IBudGetModel> {
    // buscar o usuario pelo id
    const findUserExist = await this.userRepository.findById(idUser)

    // verificar se o usuario existe
    if(!findUserExist) {
      throw new AppError('Usuário não encontrado', 404)
    }
    
    // pegar template de verificaçao de email
    let pathTemplate = env.NODE_ENV === "development" ? 
    './views/emails/budget-approved.hbs':
    './build/views/emails/budget-approved.hbs' 

    // criar o pedido
    const budget = await this.budgetRepository.create({
      idUser,
      client,
      emailClient,
      price,
      aparador,
      selante,
      chapaInferior,
      chapaSuperior,
      prolongador,
      qtdAparador,
      qtdProlongador,
      qtdSelante,
      area,
      pricePlates,
      priceGlasses,
      priceAcessories,
      priceKitSolutions,
      priceProlongador
        
    }) as IBudGetModel
  
    // enviar verificação de email
    await this.mailProvider.sendEmail(
        emailClient, 
        client,
        "Orçamento Sacada", 
        null, 
        pathTemplate,
        {
          price,
          aparador,
          selante,
          prolongador,
          qtdAparador,
          qtdProlongador,
          qtdSelante,
          chapaInferior: chapaInferior ? 'Sim' : 'Não', 
          chapaSuperior: chapaSuperior ? 'Sim' : 'Não',
          area,
          pricePlates,
          priceGlasses,
          priceAcessories,
          priceKitSolutions,
          priceProlongador
        }
    )

    // retornar o pedido
    return budget
  }
}