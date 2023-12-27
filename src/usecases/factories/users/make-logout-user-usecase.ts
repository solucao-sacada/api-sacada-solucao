import { RedisInMemoryProvider } from "@/providers/CacheProvider/implementations/provider-redis-in-memory";
import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { MongooseTokensRepository } from "@/repositories/mongoose/mongoose-tokens-repository";
import { LogoutUseCase } from "@/usecases/users/logout/logout-usecase";

export async function makeLogoutUser(): Promise<LogoutUseCase> {
    const usersTokensRepository = new MongooseTokensRepository();
    const redisStorageProvider = new RedisInMemoryProvider()
    const dayjsDateProvider = new DayjsDateProvider();
    const logoutUseCase = new LogoutUseCase(
        usersTokensRepository,
        redisStorageProvider, 
        dayjsDateProvider)

    return logoutUseCase
}