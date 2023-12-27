/* eslint-disable import/no-extraneous-dependencies */
import { makeListOrder } from "@/usecases/factories/orders/make-list-orders-usecase";
import { Request, Response } from "express";

export class ListOrdersController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listOrderUseCase = await makeListOrder()

            const orders = await listOrderUseCase.execute();

            return response.status(200).json(orders);
        } catch (error) {
            throw error
        }
    }
}
