import { makeFindBudgetById } from '@/usecases/factories/budgets/make-find-by-id-budgets-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class FindBudgetByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const budgetSchema = z.object({
              id: z.string(),
            })

            const {
                id,
            } = budgetSchema.parse(request.params)
          
            const findBudgetUseCase = await makeFindBudgetById()
            
            const budget = await findBudgetUseCase.execute({
                id,
            })
            return response.status(201).send(budget)
            
          } catch (error) {
            throw error
        }
}   }
    
