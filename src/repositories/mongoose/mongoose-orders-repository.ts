import { IOrderDTO } from "@/dtos/IOrderDTO";
import { IOrdersRepository } from "../interfaces/interface-orders-repository";
import Orders, { IOrdersModel } from "@/database/models/Orders";
import { Model } from "mongoose";

export class MongooseOrdersRepository implements IOrdersRepository {
    private Orders: Model<IOrdersModel> = Orders;

    constructor(){}
    async listByUser(idUser: string){
        try {
            return await this.Orders.find({idUser})
        } catch (error) {
            console.error(error)
            throw new Error("Error list orders by user")
        }
    }

    async create(date: IOrderDTO){
        try {
            const order = await this.Orders.create(date)
            return order
        } catch (error) {
            console.error(error)
            throw new Error("Error create order")
        }
    }

    async list(){
        try {
            return await this.Orders.find()
        } catch (error) {
            console.error(error)
            throw new Error("Error list orders")
        }
    }
  
}