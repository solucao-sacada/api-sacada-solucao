import { makeCreateNewPasswordByOldPassword } from '@/usecases/factories/users/make-change-password-by-old-password-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class UpdatePasswordByOldPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userSchemaBody = z.object({
        idUser: z.string().uuid(),
        oldPassword: z.string().min(6, 'Mínimo 6 caracteres'),
        newPassword: z.string().min(6, 'Mínimo 6 caracteres'),
      })
    
      const { idUser, oldPassword, newPassword } = userSchemaBody.parse(
        request.body,
      )
    
      const createNewPasswordUseCase = await makeCreateNewPasswordByOldPassword()
    
      await createNewPasswordUseCase.execute({
        idUser,
        oldPassword,
        newPassword,
      })
    
      return response.status(200).send({ message: 'Senha alterada com sucesso!' })
    } catch (error) {
      throw error
    }
  }
}
