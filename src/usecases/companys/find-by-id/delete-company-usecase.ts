import { ICompanyModel } from "@/database/models/Companies";
import { ICompanyRepository } from "@/repositories/interfaces/interface-companies-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestFindCompany {
  id: string
}

export class FindCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    ) {}

  async execute({
    id,
  }: IRequestFindCompany): Promise<ICompanyModel> {
      // buscar o company pelo id
      const findCompanyExist = await this.companyRepository.findById(id)

      // verificar se o company existe
      if(!findCompanyExist) {
        throw new AppError('Company não encontrado', 404)
      }

      // retornar a company
      return findCompanyExist
  }
}