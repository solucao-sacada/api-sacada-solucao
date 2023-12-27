import { makeLoginUser } from '@/usecases/factories/users/make-login-user-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const userSchema = z.object({
              email: z.string().email(), 
              password: z.string().min(6),
            })

            const { 
                email, 
                password,
            } = userSchema.parse(request.body)
          
            const loginUseCase = await makeLoginUser()
            
            const user = await loginUseCase.execute({
                email, 
                password,
            })
            return response.status(201).send(user)
            
          } catch (error) {
            throw error
        }
}   }
    
