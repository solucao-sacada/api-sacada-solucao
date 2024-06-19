import { makeCreateBudget } from '@/usecases/factories/budgets/make-create-budgets-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class CreateBudgetController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const budgetSchema = z.object({
              idUser: z.string(),
              client: z.object({
                name: z.string().min(4), 
                email: z.string().email(), 
                address: z.string(),
              }),
              price: z.number().positive().nonnegative(),
              aparador: z.boolean(),
              selante: z.boolean(),
              prolongador: z.boolean(),
              qtdAparador: z.number().nonnegative(),
              qtdSelante: z.number().nonnegative(),
              qtdProlongador: z.number().nonnegative(),
              chapaSuperior: z.boolean(),
              chapaInferior: z.boolean(),
              area: z.number().nonnegative(),
              pricePlates: z.number().nonnegative(),
              priceGlasses: z.number().nonnegative(),
              priceAcessories: z.number().nonnegative(),
              priceProlongador: z.number().nonnegative(),
              priceKitSolutions: z.number().nonnegative(),
              height: z.number().positive().nonnegative(),
              width: z.number().positive().nonnegative(),
            })

            const {
                idUser,
                client,
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
                height,
                width
            } = budgetSchema.parse(request.body)
          
            const createBudgetUseCase = await makeCreateBudget()
            
            const budget = await createBudgetUseCase.execute({
                idUser,
                client,
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
                height,
                width
            })
            return response.status(201).send(budget)
            
          } catch (error) {
            throw error
        }
}   }
    
