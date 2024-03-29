import { MailProvider } from "@/providers/MailProvider/implementations/provider-sendgrid";
import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { RegisterUseCase } from "@/usecases/users/register/register-usecase";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { MongooseTokensRepository } from "@/repositories/mongoose/mongoose-tokens-repository";

export async function makeRegisterUser(): Promise<RegisterUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const usersTokensRepository = new MongooseTokensRepository();
    const sendMailProvider = new MailProvider();
    const dayjsDateProvider = new DayjsDateProvider();
    const registerUserUseCase = new RegisterUseCase(
        usersRepository,
        dayjsDateProvider,
        usersTokensRepository,
        sendMailProvider,
    )

    return registerUserUseCase
}