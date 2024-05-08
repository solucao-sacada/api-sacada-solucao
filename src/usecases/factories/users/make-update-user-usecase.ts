import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { UpdateUserUseCase } from "@/usecases/users/update-full/update-user-usecase";

export async function makeUpdateUser(): Promise<UpdateUserUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(usersRepository)

    return updateUserUseCase
}