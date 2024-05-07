import { IBudgetDTO } from "@/dtos/IBudget";
import { IBudgetRepository } from "../interfaces/interface-budget-repository";
import Budgets, { IBudGetModel } from "@/database/models/Budgets";
import { Model } from "mongoose";
import { AppError } from "@/usecases/errors/AppError";

export class MongooseBudgetRepository implements IBudgetRepository{
    private Budget: Model<IBudGetModel> = Budgets;

    constructor(){}
    async listByClient(idUser: string) {
        try {
            const list = await this.Budget.find({idUser}).sort({code: -1})

            return list
        } catch (error) {
            console.error(error);
            throw new Error("Error list budget by client")
        }   
    }

    async create(data: IBudgetDTO) {
        try {
             // contar quantos pedidos existem
            const countOrders = await this.Budget.countDocuments()
            const newBudget = await this.Budget.create({
                ...data,
                code: Number(countOrders) + 1
            })
            
            return newBudget 
        } catch (error) {
            console.error(error);
            throw new Error("Error create budget")
        }
    }
    async update(budget: IBudgetDTO) {
        try {
            const newBudget = await this.Budget.findByIdAndUpdate(budget.id, budget, {new: true}) as IBudGetModel

            return newBudget
        } catch (error) {
            console.error(error);
            throw new Error("Error update budget")
        }
    }
    async delete(id: string) {
        try {
            await this.Budget.findByIdAndDelete(id)
        } catch (error) {
            console.error(error);
            throw new Error("Error delete budget by id")
        }
    }
    async list() {
       try {
        const list = await this.Budget.find().sort({code: -1})

        return list
       } catch (error) {
            console.error(error);
            throw new Error("Error list budgets")
       }
    }
    async findById(id: string){
        try {
            const budget = await this.Budget.findById(id)

            return budget
        } catch (error) {
            console.error(error);
            throw new Error("Error find budget by id")
        }
    }
}