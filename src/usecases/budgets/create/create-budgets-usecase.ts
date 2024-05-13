import { IBudGetModel } from "@/database/models/Budgets";
import { env } from "@/env";
import { IMailProvider } from "@/providers/MailProvider/interface-mail-provider";
import { IFileProvider } from "@/providers/StorageProvider/file-provider.interface";
import { IStorageProvider } from "@/providers/StorageProvider/storage-provider.interface";
import { IBudgetRepository } from "@/repositories/interfaces/interface-budget-repository";
import { ICompanyRepository } from "@/repositories/interfaces/interface-companies-repository";
import { IUsersRepository } from "@/repositories/interfaces/interface-users-repository";
import { AppError } from "@/usecases/errors/AppError";
import { editarPDF } from "@/utils/edit-PDF";

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
  
  height: number
  width: number
}

export class CreateBudgetsUseCase {
  constructor(
    private budgetRepository: IBudgetRepository,
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private fileProvider: IFileProvider,
    private companyRepository: ICompanyRepository
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
    priceProlongador,
    width,
    height
  }:IRequestCreateBudget): Promise<IBudGetModel> {
    // buscar o usuario pelo id
    const findUserExist = await this.userRepository.findById(idUser)

    // verificar se o usuario existe
    if(!findUserExist) {
      throw new AppError('Usuário não encontrado', 404)
    }
    
    // buscar a empresa pelo id
    const findCompany = await this.companyRepository.findByUser(findUserExist.id)
    
    // verificar se a empresa existe
    if(!findCompany) {
      throw new AppError('Empresa não encontrada', 404)
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
      priceProlongador,
      width,
      height,
        
    }) as IBudGetModel
    
    let priceGlassesFormmated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceGlasses);
    let pricePlatesFormmated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pricePlates);
    let priceAcessoriesFormmated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceAcessories);
    let priceKitSolutionsFormmated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceKitSolutions);
    let priceProlongadorFormmated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceProlongador);
    let areaFormmated = new Intl.NumberFormat().format(area);
    let totalFormmated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    let heightFormmated = new Intl.NumberFormat().format(height);
    let widthFormmated = new Intl.NumberFormat().format(width);

    const budgetFormmated = {
      ...budget,
      id: budget._id,
      qtdAparador,
      qtdProlongador,
      qtdSelante,
      priceGlasses: priceGlassesFormmated,
      pricePlates: pricePlatesFormmated,
      priceAcessories: priceAcessoriesFormmated,
      priceKitSolutions: priceKitSolutionsFormmated,
      priceProlongador: priceProlongadorFormmated,
      area: areaFormmated,
      price: totalFormmated,
      height: heightFormmated,
      width: widthFormmated
    } as unknown as IBudGetModel 

    // CRIAR PDF COM O ORÇAMENTO
    const {filePath: pathPdf, namePdf} = await editarPDF(budgetFormmated, findCompany)    // enviar verificação de email
    
    await this.mailProvider.sendEmail(
        emailClient, 
        client,
        "Orçamento Sacada", 
        null, 
        pathTemplate,
        {
          price: totalFormmated,
          qtdAparador,
          qtdProlongador,
          qtdSelante,
          chapaInferior: chapaInferior ? 'Sim' : 'Não', 
          chapaSuperior: chapaSuperior ? 'Sim' : 'Não',
          area: areaFormmated,
          pricePlates: pricePlatesFormmated,
          priceGlasses: priceGlassesFormmated,
          priceAcessories: priceAcessoriesFormmated,
          priceKitSolutions: priceKitSolutionsFormmated,
          priceProlongador: priceProlongadorFormmated,
          width: widthFormmated,
          height: heightFormmated
        },
        `${pathPdf}/${namePdf}`
    )
    // deletar o arquivo PDF criado
    this.fileProvider.deleteFileTmp(namePdf, pathPdf)

    // retornar o pedido
    return budget
  }
}