import { makeFindUser } from '@/usecases/factories/users/make-find-user-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export class FindUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const userSchema = z.object({
                id: z.string().refine((value)=>{
                    try {
                        if(isValidObjectId(value)){
                            return true
                        }
                    } catch {
                        return false                        
                    }
                },{message: 'ObjectId inválido'}),
            })

            const { 
                id
            } = userSchema.parse(request.params)

            const findUserUseCase = await makeFindUser()
            
            const user = await findUserUseCase.execute({
                id
            })
            
            return response.status(200).send(user)
            
          } catch (error) {
            throw error
        }
    }
}
    
