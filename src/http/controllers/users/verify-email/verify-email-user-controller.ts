import { makeVerifyEmail } from '@/usecases/factories/users/make-verify-email-user-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class VerifyEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
          const userSchema = z.object({
            email: z.string().email(),
            token: z.string(),
          })

          const {
            email,
            token,
          } = userSchema.parse(request.query)

          const verifyEmailUseCase = await makeVerifyEmail()

          await verifyEmailUseCase.execute({
            token,
            email
          })

          return response.status(200).send({ message: 'Email verificado com sucesso' })
            
          } catch (error) {
            throw error
        }
}   }
    
