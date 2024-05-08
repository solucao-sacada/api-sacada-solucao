import { ICompanyModel } from "@/database/models/Companies";
import { ICompanyRepository } from "@/repositories/interfaces/interface-companies-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestUpdateCompany {
  id: string
  cnpj: string,
  tradingName: string	
  legalName: string	
  stateRegistration: string	
  streetAddress: string	
  num: number
  complement: string	
  zipCode: number	
  neighborhood: string	
  city: string	
  state: string
}

export class UpdateCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    ) {}

  async execute({
    id,
    cnpj,
    tradingName,
    legalName,
    stateRegistration,
    streetAddress,
    num,
    complement,
    zipCode,
    neighborhood,
    city,
    state
  }: IRequestUpdateCompany): Promise<ICompanyModel> {
    // buscar o company pelo id
    const findCompanyExist = await this.companyRepository.findById(id)

    // verificar se o company existe
    if(!findCompanyExist) {
    throw new AppError('Company não encontrado', 404)
    }

    // buscar o company pelo cnpj
    const findCompanyCnpj = await this.companyRepository.findByCNPJ(cnpj)
    
    // verificar se o company existe
    if(findCompanyCnpj && findCompanyExist.id !== findCompanyCnpj.id) {
    throw new AppError('CNPJ ja cadastrado', 409)
    }

    //  verificar tranding name
    const findCompanyTradingName = await this.companyRepository.findByTradingName(tradingName)

    // verificar se o company existe
    if(findCompanyTradingName && findCompanyExist.id !== findCompanyTradingName.id) {
       throw new AppError('Razão social ja cadastrada', 409)
    }

    // verificar se legal name existe
    const findCompanyLegalName = await this.companyRepository.findByLegalName(legalName)

    // verificar se o company existe
    if(findCompanyLegalName && findCompanyExist.id !== findCompanyLegalName.id) {
       throw new AppError('Nome fantasia ja cadastrada', 409)
    }

    // atualizar o company
    const company = await this.companyRepository.update({
      id,
      cnpj,
      tradingName,
      legalName,
      stateRegistration,
      streetAddress,
      num,
      complement,
      zipCode,
      neighborhood,
      city,
      state
    }) as ICompanyModel

    return company
  }
}