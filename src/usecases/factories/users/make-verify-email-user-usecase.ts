import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { MongooseTokensRepository } from "@/repositories/mongoose/mongoose-tokens-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { VerifyEmailUseCase } from "@/usecases/users/verify-email/verify-email-usecase";

export async function makeVerifyEmail(): Promise<VerifyEmailUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const usersTokensRepository = new MongooseTokensRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const verifyEmailUseCase = new VerifyEmailUseCase(
        usersRepository,
        usersTokensRepository,
        dayjsDateProvider,
    )

    return verifyEmailUseCase
}