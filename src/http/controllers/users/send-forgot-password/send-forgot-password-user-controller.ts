import { makeDeleteUser } from '@/usecases/factories/users/make-delete-user-usecase'
import { makeVerifyEmailUser } from '@/usecases/factories/users/make-email-exists-users-usecases'
import { makeSendForgotPassword } from '@/usecases/factories/users/make-send-forgot-password-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export class SendForgotPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const userSchema = z.object({
                email: z.string().email(),
              })
  
              const {
                email,
              } = userSchema.parse(request.body)
  
              const sendForgotPasswordUsecase = await makeSendForgotPassword()
  
              await sendForgotPasswordUsecase.execute({
                email
              })
  
              return response.status(200).send({ message: 'Email with password reset link sent!' })
            
        } catch (error) {
            throw error
        }
    }
}
    
