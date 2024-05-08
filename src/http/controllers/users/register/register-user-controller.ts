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
              image: z.string().optional(),
              company: z.object({
                tradingName: z.string(),
                legalName: z.string(),
                stateRegistration: z.string(),
                streetAddress: z.string(),
                cnpj: z.string(),
                num: z.number().positive().int(),
                city: z.string(),
                state: z.string(),
                zipCode: z.number().positive().int(),
                neighborhood: z.string(),
                complement: z.string(),
              }),
            })

            const { 
                email, 
                password,
                name,
                phone,
                image,
                company
            } = userSchema.parse(request.body)
          
            const registerUseCase = await makeRegisterUser()
            
            await registerUseCase.execute({
                email, 
                password,
                name,
                phone,
                image,
                company
            })
            return response.status(201).send({ message: 'Usuário criado com sucesso' })
            
          } catch (error) {
            throw error
        }
}   }
    
