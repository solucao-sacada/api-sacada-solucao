import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { FindUserUseCase } from "../../users/find/find-user-usecase";

export async function makeFindUser(): Promise<FindUserUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const findUserUseCase = new FindUserUseCase(usersRepository)

    return findUserUseCase
}