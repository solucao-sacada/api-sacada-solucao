import { MongooseUsersRepository } from '@/repositories/mongoose/mongoose-users-repository'
import { CreateNewPasswordByOldPassword } from '@/usecases/users/create-new-password-with-old-password/change-password-usecase'

export async function makeCreateNewPasswordByOldPassword(): Promise<CreateNewPasswordByOldPassword> {
  const usersRepository = new MongooseUsersRepository()
  const createNewPasswordByOldPassword = new CreateNewPasswordByOldPassword(
    usersRepository,
  )

  return createNewPasswordByOldPassword
}
