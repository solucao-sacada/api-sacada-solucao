import { makeCreateBudget } from '@/usecases/factories/budgets/make-update-budgets-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class CreateBudgetController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const budgetSchema = z.object({
              idUser: z.string(),
              client: z.string().min(4), 
              emailClient: z.string().email(), 
              price: z.number().positive().nonnegative(),
            })

            const {
                idUser,
                client,
                emailClient,
                price,
            } = budgetSchema.parse(request.body)
          
            const createBudgetUseCase = await makeCreateBudget()
            
            const budget = await createBudgetUseCase.execute({
                idUser,
                client,
                emailClient,
                price,
            })
            return response.status(201).send(budget)
            
          } catch (error) {
            throw error
        }
}   }
    
