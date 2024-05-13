import { DayjsDateProvider } from '@/providers/DateProvider/implementations/provider-dayjs'
import { MongooseTokensRepository } from '@/repositories/mongoose/mongoose-tokens-repository'
import { VerifyTokenIsValidUseCase } from '@/usecases/users/verify-token-is-valid/verify-token-is-valid-usecase'

export async function makeVerifyTokenIsValid(): Promise<VerifyTokenIsValidUseCase> {
  const usersTokensRepository = new MongooseTokensRepository()
  const dayjsDateProvider = new DayjsDateProvider()
  const verifyTokenIsValidUseCase = new VerifyTokenIsValidUseCase(
    usersTokensRepository,
    dayjsDateProvider,
  )

  return verifyTokenIsValidUseCase
}
