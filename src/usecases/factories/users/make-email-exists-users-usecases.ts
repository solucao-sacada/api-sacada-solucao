import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { EmailVerifyUserUseCase } from "@/usecases/users/email-exists/email-exists-users.usecase";

export async function makeVerifyEmailUser(): Promise<EmailVerifyUserUseCase> {
    const usersRepository = new MongooseUsersRepository();
    const emailVerifyUserUseCase = new EmailVerifyUserUseCase(usersRepository)

    return emailVerifyUserUseCase
}