/* eslint-disable import/no-extraneous-dependencies */
import { makeListOrderByUser } from "@/usecases/factories/orders/make-list-by-user-orders-usecase";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { z } from "zod";

export class ListOrdersByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const orderSchema = z.object({
                id: z.string()
            })

            const {id} = orderSchema.parse(request.params)

            const listOrdersByUserUseCase = await makeListOrderByUser()

            const orders = await listOrdersByUserUseCase.execute({idUser: id});

            return response.status(200).json(orders);
        } catch (error) {
            throw error
        }
    }
}
