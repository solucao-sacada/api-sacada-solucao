import { Accessories, Balcony, Client } from '@/dtos/ITypeOrderJSON'
import { makeDownloadJSON } from '@/usecases/factories/images/make-download-images-to-order-usecase'
import { makeCreateOrder } from '@/usecases/factories/orders/make-create-orders-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

interface IOrderJSON{
    idUser: string,
    accessories: Accessories,
    balcony: Balcony,
    client: Client,
    technician: string,
    observation?: string,
}

export class DowloadOrderJSONController {
  async handle(request: Request, response: Response): Promise<Response | any> {
        try {
            const orderSchema = z.object({
                id: z.string()
            })

            const orderJSON = orderSchema.parse(request.params)
            
            const { 
                id, 
            } = orderJSON

            const createOrderUseCase = await makeDownloadJSON()
            
            const file = await createOrderUseCase.execute({
                idOrder: id
            })
            return response.status(200).send({file})
          } catch (error) {
            throw error
        }
}   }
    
