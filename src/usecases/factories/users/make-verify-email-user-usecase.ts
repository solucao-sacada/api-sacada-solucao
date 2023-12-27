import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { VerifyEmailUseCase } from "@/usecases/users/verify-email/verify-email-usecase";

export async function makeVerifyEmail(): Promise<VerifyEmailUseCase> {
    const usersRepository = new PrismaUsersRepository();
    const usersTokensRepository = new PrismaTokensRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const verifyEmailUseCase = new VerifyEmailUseCase(
        usersRepository,
        usersTokensRepository,
        dayjsDateProvider,
    )

    return verifyEmailUseCase
}