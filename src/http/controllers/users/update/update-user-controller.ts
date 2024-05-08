import { makeRegisterUser } from '@/usecases/factories/users/make-register-user-usecase'
import { makeUpdateUser } from '@/usecases/factories/users/make-update-user-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const userSchema = z.object({
              id: z.string(),
              name: z.string().min(4), 
              email: z.string().email(), 
              phone: z.string(), 
            })

            const { 
                id,
                email, 
                name,
                phone,
            } = userSchema.parse(request.body)
          
            const updateUuserUseCase = await makeUpdateUser()
            
            const user = await updateUuserUseCase.execute({
                id,
                email, 
                name,
                phone,
            })
            return response.status(201).send(user)
            
          } catch (error) {
            throw error
        }
}   }
    
