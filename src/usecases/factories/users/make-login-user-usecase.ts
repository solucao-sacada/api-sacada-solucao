import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { MongooseCompanyRepository } from "@/repositories/mongoose/mongoonse-company-repository";
import { MongooseTokensRepository } from "@/repositories/mongoose/mongoose-tokens-repository";
import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { LoginUseCase } from "@/usecases/users/login/login-usecase";

export async function makeLoginUser(): Promise<LoginUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const usersTokensRepository = new MongooseTokensRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const companysRepository = new MongooseCompanyRepository();
    
    const loginUseCase = new LoginUseCase(
        usersRepository,
        usersTokensRepository,
        dayjsDateProvider,
        companysRepository
    )

    return loginUseCase
}