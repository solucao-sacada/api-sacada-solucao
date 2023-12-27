import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { MongooseTokensRepository } from "@/repositories/mongoose/mongoose-tokens-repository";
import { RefreshTokenUseCase } from "@/usecases/users/refresh-token/refresh-token-usecase";

export async function makeRefreshToken(): Promise<RefreshTokenUseCase> {
    const usersTokensRepository = new MongooseTokensRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const refreshTokenUseCase = new RefreshTokenUseCase(
        usersTokensRepository,
        dayjsDateProvider
    )

    return refreshTokenUseCase
}