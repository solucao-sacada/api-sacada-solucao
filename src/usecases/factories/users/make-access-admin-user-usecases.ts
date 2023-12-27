import { AccessAdminUsersUseCase } from "@/usecases/users/access-admin/access-admin-users-usecases";

export async function makeAccessAdminUser(): Promise<AccessAdminUsersUseCase> {
    const usersRepository = new PrismaUsersRepository();
    const keysRepository = new PrismaKeysRepository()
    const accessAdminUsersUseCase = new AccessAdminUsersUseCase(usersRepository, keysRepository)

    return accessAdminUsersUseCase
}