import { makeUpdateCompany } from '@/usecases/factories/companys/make-update-company-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class UpdateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const companySchema = z.object({
              id: z.string(),
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
            })

            const { 
                id,
                tradingName,
                legalName,
                stateRegistration,
                streetAddress,
                cnpj,
                num,
                city,
                state,
                zipCode,
                neighborhood,
                complement,
            } = companySchema.parse(request.body)
          
            const updateCompanyUseCase = await makeUpdateCompany()
            
            const company = await updateCompanyUseCase.execute({
              id,
              tradingName,
              legalName,
              stateRegistration,
              streetAddress,
              cnpj,
              num,
              city,
              state,
              zipCode,
              neighborhood,
              complement,
            })
            return response.status(201).send(company)
            
          } catch (error) {
            throw error
        }
}   }
    
