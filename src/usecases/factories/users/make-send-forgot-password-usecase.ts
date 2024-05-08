import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { MailProvider } from "@/providers/MailProvider/implementations/provider-sendgrid";
import { MongooseTokensRepository } from "@/repositories/mongoose/mongoose-tokens-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { SendForgotPasswordUseCase } from "@/usecases/users/send-forgot-password/send-forgot-password-usecase";

export async function makeSendForgotPassword(): Promise<SendForgotPasswordUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const usersTokensRepository = new MongooseTokensRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const sendMailProvider = new MailProvider();
    const sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
        usersRepository,
        usersTokensRepository,
        dayjsDateProvider,
        sendMailProvider
    )

    return sendForgotPasswordUseCase
}