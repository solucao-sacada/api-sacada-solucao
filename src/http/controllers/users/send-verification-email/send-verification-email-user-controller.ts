import { makeSendVerificationEmail } from '@/usecases/factories/users/make-send-verification-email-user-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class SendVerificationEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
          const userSchema = z.object({
            email: z.string().email(),
          })
      
          const { email } = userSchema.parse(request.params)
      
          const sendEmailVerificationUserUsecase = await makeSendVerificationEmail()
      
          await sendEmailVerificationUserUsecase.execute({
            email,
          })
      
          return response
            .status(200)
            .send({ message: 'E-mail de verificação enviado!' })
            
        } catch (error) {
            throw error
        }
    }
}
    
