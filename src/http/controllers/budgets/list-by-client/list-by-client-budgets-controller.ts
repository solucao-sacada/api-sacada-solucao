import { makeListBudgetByClient } from '@/usecases/factories/budgets/make-list-by-client-budgets-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class ListBudgetsByClientController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const paramsSchema = z.object({
              id: z.string() 
            })

            const { id } = paramsSchema.parse(request.params)

            const listBudgetUseCase = await makeListBudgetByClient()
            
            const budget = await listBudgetUseCase.execute({
                idUser: id
            })
            return response.status(201).send(budget)
            
          } catch (error) {
            throw error
        }
}   }
    
