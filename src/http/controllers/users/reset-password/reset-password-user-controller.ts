import { makeVerifyEmailUser } from '@/usecases/factories/users/make-email-exists-users-usecases'
import { makeResetPassword } from '@/usecases/factories/users/make-reset-password-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class ResetPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const userSchemaBody = z.object({
                password: z.string().min(6),
              })
              const userSchemaQuery = z.object({
                  token: z.string(),
                })
  
              const {
                password,
              } = userSchemaBody.parse(request.body)
  
              const {
                  token,
                } = userSchemaQuery.parse(request.query)
  
              const resetPasswordUseCase = await makeResetPassword()
  
              await resetPasswordUseCase.execute({
                password,
                token
              })
            
            return response.status(200).send('Usuário verificado com sucesso')
            
        } catch (error) {
            throw error
        }
    }
}
    
