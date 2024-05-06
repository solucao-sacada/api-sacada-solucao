import { IOrderDTO } from "@/dtos/IOrderDTO";
import { IOrdersRepository } from "../interfaces/interface-orders-repository";
import Orders, { IOrdersModel } from "@/database/models/Orders";
import { Model } from "mongoose";

export class MongooseOrdersRepository implements IOrdersRepository {
    private Orders: Model<IOrdersModel> = Orders;

    constructor(){}
    async update(id: string, data?: IOrderDTO | undefined) {
        try {
            return await this.Orders.findByIdAndUpdate(id, {
                urlJSON: data?.urlJSON,
                nameJSON: data?.nameJSON,
                status: data?.status,
            })
        } catch (error) {
            console.error(error)
            throw new Error("Error update order")
        }
    }

    async findById(id: string){
        try {
            const order = await this.Orders.findById(id)

            return order
        } catch (error) {
            console.error(error)
            throw new Error("Error find order by id")
        }
    }
    async listByUser(idUser: string){
        try {
            return await this.Orders.find({idUser})
        } catch (error) {
            console.error(error)
            throw new Error("Error list orders by user")
        }
    }

    async create({
        accessories,
        balcony,
        client,
        idUser,
        technician,
        observation
    }: IOrderDTO){
        try {
            // contar quantos pedidos existem
            const countOrders = await this.Orders.countDocuments()
            const order = await this.Orders.create({
                accessories,
                balcony,
                client,
                code: Number(countOrders) + 1,
                idUser,
                technician,
                observation
            })
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