import { Accessories, Balcony, Client } from '@/dtos/ITypeOrderJSON'
import { makeAlterStatusOrder } from '@/usecases/factories/orders/make-alter-status-orders-usecase'
import { makeCreateOrder } from '@/usecases/factories/orders/make-create-orders-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export class AlterStatusOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const orderSchemaBody = z.object({
              idOrder: z.string(),
              status: z.enum(['CANCELED', 'WAIT_ANSWER', 'DONE', 'PENDING', 'APRROVED']),
            })

            const orderJSON = orderSchemaBody.parse(request.query)
            
            const {
                idOrder,
                status
            } = orderJSON

            const alterOrderUseCase = await makeAlterStatusOrder()
            
            const order = await alterOrderUseCase.execute({
                idOrder,
                status
            })
            
            return response.status(201).send(order)
          } catch (error) {
            throw error
        }
}   }
    
