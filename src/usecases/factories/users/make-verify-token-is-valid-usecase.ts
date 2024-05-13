import { DayjsDateProvider } from '@/providers/DateProvider/implementations/provider-dayjs'
import { MongooseUsersRepository } from '@/repositories/mongoose/mongoose-users-repository'
import { VerifyTokenIsValidUseCase } from '@/usecases/users/verify-token-is-valid/verify-token-is-valid-usecase'

export async function makeVerifyTokenIsValid(): Promise<VerifyTokenIsValidUseCase> {
  const usersTokensRepository = new MongooseUsersRepository()
  const dayjsDateProvider = new DayjsDateProvider()
  const verifyTokenIsValidUseCase = new VerifyTokenIsValidUseCase(
    usersTokensRepository,
    dayjsDateProvider,
  )

  return verifyTokenIsValidUseCase
}
