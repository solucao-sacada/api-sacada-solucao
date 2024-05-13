import 'dotenv/config'
import { compare, hash } from 'bcrypt'
import { IUsersRepository } from '@/repositories/interfaces/interface-users-repository'
import { AppError } from '@/usecases/errors/AppError'

interface IRequestResetPassword {
  idUser: string
  oldPassword: string
  newPassword: string
}

export class CreateNewPasswordByOldPassword {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    idUser,
    newPassword,
    oldPassword,
  }: IRequestResetPassword): Promise<void> {
    // buscar usuário no banco
    const findUserExist = await this.usersRepository.findById(idUser)

    // verificar se usuário existe
    if (!findUserExist) {
      throw new AppError('Usuário não existe', 404)
    }

    // comparar senha antiga com a senha do banco
    const passwordOldMatch = await compare(oldPassword, findUserExist.password as string)

    // verificar se senha antiga é igual a senha do banco
    if (!passwordOldMatch) {
      throw new AppError('Senha antiga não incorreta', 401)
    }

    // criptografar senha
    const createNewPassword = await hash(newPassword, 8)

    // chamar metodo de atualizar senha
    await this.usersRepository.changePassword(
      findUserExist.id,
      createNewPassword,
    )
  }
}
