import { ListImageByUserUseCase } from "@/usecases/images/list-by-user/list-by-user-images-usecase";

export async function makeListImageByUser(): Promise<ListImageByUserUseCase> {
    const imageRepository = new PrismaImageRepository()
    const userRepository = new PrismaUsersRepository()
    const listImageByUserUseCase = new ListImageByUserUseCase(
        imageRepository,
        userRepository
    )

    return listImageByUserUseCase
}