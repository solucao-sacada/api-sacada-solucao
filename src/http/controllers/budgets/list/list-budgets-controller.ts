import { makeListBudget } from '@/usecases/factories/budgets/make-list-budgets-usecase'
import { Request, Response } from 'express'

export class ListBudgetsController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listBudgetUseCase = await makeListBudget()
            
            const budget = await listBudgetUseCase.execute()
            return response.status(201).send(budget)
            
          } catch (error) {
            throw error
        }
}   }
    
