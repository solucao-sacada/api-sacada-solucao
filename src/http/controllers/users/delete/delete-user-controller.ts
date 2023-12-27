import { makeDeleteUser } from '@/usecases/factories/users/make-delete-user-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export class DeleteUserController {
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

            const deleteUserUseCase = await makeDeleteUser()
            
            await deleteUserUseCase.execute({
                id
            })
            
            return response.status(200).send('Usuário deletado com sucesso')
            
        } catch (error) {
            throw error
        }
    }
}
    
