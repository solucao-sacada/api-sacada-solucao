import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { DeleteUserUseCase } from "@/usecases/users/delete/delete-user-usecase";

export async function makeDeleteUser(): Promise<DeleteUserUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

    return deleteUserUseCase
}