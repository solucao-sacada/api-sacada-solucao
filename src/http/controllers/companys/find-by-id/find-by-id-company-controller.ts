import { makeFindCompany } from '@/usecases/factories/companys/make-find-company-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export class FindCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const companySchema = z.object({
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
            } = companySchema.parse(request.params)

            const findCompanyUseCase = await makeFindCompany()
            
            const user = await findCompanyUseCase.execute({
                id
            })
            
            return response.status(200).send(user)
            
        } catch (error) {
            throw error
        }
    }
}
    
