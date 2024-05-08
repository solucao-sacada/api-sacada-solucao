import { makeDeleteUser } from '@/usecases/factories/users/make-delete-user-usecase'
import { makeVerifyEmailUser } from '@/usecases/factories/users/make-email-exists-users-usecases'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export class EmailExistController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const userSchema = z.object({
                email: z.string()
            })

            const { 
                email
            } = userSchema.parse(request.query)

            const emailExistsUseCase = await makeVerifyEmailUser()
            
            await emailExistsUseCase.execute({
                email
            })
            
            return response.status(200).send('Usuário verificado com sucesso')
            
        } catch (error) {
            throw error
        }
    }
}
    
