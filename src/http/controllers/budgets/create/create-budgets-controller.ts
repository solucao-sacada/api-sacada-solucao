import { makeCreateBudget } from '@/usecases/factories/budgets/make-create-budgets-usecase'
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
              aparador: z.boolean(),
              selante: z.boolean(),
              prolongador: z.boolean(),
              qtdAparador: z.number().positive().nonnegative(),
              qtdSelante: z.number().positive().nonnegative(),
              qtdProlongador: z.number().positive().nonnegative(),
              chapaSuperior: z.boolean(),
              chapaInferior: z.boolean(),
              area: z.number().positive().nonnegative(),
              pricePlates: z.number().positive().nonnegative(),
              priceGlasses: z.number().positive().nonnegative(),
              priceAcessories: z.number().positive().nonnegative(),
              priceProlongador: z.number().positive().nonnegative(),
              priceKitSolutions: z.number().positive().nonnegative(),
              tehnician: z.string().min(4)
            })

            const {
                idUser,
                client,
                emailClient,
                price,
                aparador,
                selante,
                prolongador,
                qtdAparador,
                qtdSelante,
                qtdProlongador,
                chapaSuperior,
                chapaInferior,
                area,
                pricePlates,
                priceGlasses,
                priceAcessories,
                priceProlongador,
                priceKitSolutions,
                tehnician
            } = budgetSchema.parse(request.body)
          
            const createBudgetUseCase = await makeCreateBudget()
            
            const budget = await createBudgetUseCase.execute({
                idUser,
                client,
                emailClient,
                price,
                aparador,
                selante,
                prolongador,
                qtdAparador,
                qtdSelante,
                qtdProlongador,
                chapaSuperior,
                chapaInferior,
                area,
                pricePlates,
                priceGlasses,
                priceAcessories,
                priceProlongador,
                priceKitSolutions,
                tehnician
            })
            return response.status(201).send(budget)
            
          } catch (error) {
            throw error
        }
}   }
    
