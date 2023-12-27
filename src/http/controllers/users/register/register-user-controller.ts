import { makeRegisterUser } from '@/usecases/factories/users/make-register-user-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class RegisterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const userSchema = z.object({
              name: z.string().min(4), 
              email: z.string().email(), 
              password: z.string().min(6),
              phone: z.string().optional(), 
              cpfCnpj: z.string(),
              image: z.string().optional(),
              address: z.object({
                street: z.string(),
                num: z.number().positive().int(),
                city: z.string(),
                state: z.string(),
                country: z.string(),
                zipCode: z.number().positive().int(),
                district: z.string(),
                complement: z.string().optional(),
                reference: z.string().optional(),
              }).optional(),
            })

            const { 
                email, 
                password,
                name,
                phone,
                cpfCnpj,
                image,
                address
            } = userSchema.parse(request.body)
          
            const registerUseCase = await makeRegisterUser()
            
            const user = await registerUseCase.execute({
                email, 
                password,
                name,
                phone,
                cpfCnpj,
                image,
                address
            })
            return response.status(201).send(user)
            
          } catch (error) {
            throw error
        }
}   }
    
