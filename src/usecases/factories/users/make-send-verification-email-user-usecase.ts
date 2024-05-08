import { DayjsDateProvider } from '@/providers/DateProvider/implementations/provider-dayjs'
import { MailProvider } from '@/providers/MailProvider/implementations/provider-sendgrid'
import { MongooseTokensRepository } from '@/repositories/mongoose/mongoose-tokens-repository'
import { MongooseUsersRepository } from '@/repositories/mongoose/mongoose-users-repository'
import { SendVerificationEmailUserUseCase } from '@/usecases/users/send-verification-email/send-verification-email-users-usecase'

export async function makeSendVerificationEmail(): Promise<SendVerificationEmailUserUseCase> {
  const usersRepository = new MongooseUsersRepository()
  const sendMailProvider = new MailProvider()
  const usersTokensRepository = new MongooseTokensRepository()
  const dayjsDateProvider = new DayjsDateProvider()

  const sendVerificationEmailUserUseCase = new SendVerificationEmailUserUseCase(
    usersRepository,
    sendMailProvider,
    usersTokensRepository,
    dayjsDateProvider
  )

  return sendVerificationEmailUserUseCase
}
