import { makeDeleteBudget } from '@/usecases/factories/budgets/make-delete-budgets-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class DeleteBudgetController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const budgetSchema = z.object({
              id: z.string(),
            })

            const {
                id,
            } = budgetSchema.parse(request.params)
          
            const deleteBudgetUseCase = await makeDeleteBudget()
            
            await deleteBudgetUseCase.execute({
                id,
            })
            return response.status(201).send({message: 'Orçamento deletado com sucesso!'})
            
          } catch (error) {
            throw error
        }
}   }
    
