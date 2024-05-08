import { makeDeleteCompany } from '@/usecases/factories/companys/make-delete-company-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export class DeleteCompanyController {
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

            const deleteCompanyUseCase = await makeDeleteCompany()
            
            await deleteCompanyUseCase.execute({
                id
            })
            
            return response.status(200).send('Empresa deletada com sucesso')
            
        } catch (error) {
            throw error
        }
    }
}
    
