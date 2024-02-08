import { makeUpdateBudget } from '@/usecases/factories/budgets/make-create-budgets-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class UpdateBudgetController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const budgetSchema = z.object({
              client: z.string().min(4), 
              emailClient: z.string().email(), 
            })

            const budIdParamSchema = z.object({
              id: z.string(),
            })

            const {
                client,
                emailClient,
            } = budgetSchema.parse(request.body)

            const {id} = budIdParamSchema.parse(request.params)
          
            const updateBudgetUseCase = await makeUpdateBudget()
            
            const budget = await updateBudgetUseCase.execute({
                id,
                client,
                emailClient,
            })
            return response.status(201).send(budget)
            
          } catch (error) {
            throw error
        }
}   }
    
