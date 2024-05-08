import { ICompanyRepository } from "@/repositories/interfaces/interface-companies-repository";
import { AppError } from "@/usecases/errors/AppError";

interface IRequestDeleteCompany {
  id: string
}

export class DeleteCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    ) {}

  async execute({
    id,
  }: IRequestDeleteCompany): Promise<void> {
      // buscar o company pelo id
      const findCompanyExist = await this.companyRepository.findById(id)

      // verificar se o company existe
      if(!findCompanyExist) {
        throw new AppError('Company não encontrado', 404)
      }

      // deleta o company
      await this.companyRepository.delete(id)

  }
}