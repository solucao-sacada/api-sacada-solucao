import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { MongooseTokensRepository } from "@/repositories/mongoose/mongoose-tokens-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { ResetPasswordUseCase } from "@/usecases/users/reset-password/reset-password-usecase";

export async function makeResetPassword(): Promise<ResetPasswordUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const usersTokensRepository = new MongooseTokensRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const resetPasswordUseCase = new ResetPasswordUseCase(
        usersRepository,
        usersTokensRepository,
        dayjsDateProvider,
    )

    return resetPasswordUseCase
}