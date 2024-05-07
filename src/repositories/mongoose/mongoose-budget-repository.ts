import { IBudgetDTO } from "@/dtos/IBudget";
import { IBudgetRepository } from "../interfaces/interface-budget-repository";
import Budgets, { IBudGetModel } from "@/database/models/Budgets";
import { Model } from "mongoose";
import { AppError } from "@/usecases/errors/AppError";

export class MongooseBudgetRepository implements IBudgetRepository{
    private Budget: Model<IBudGetModel> = Budgets;

    constructor(){}
    async listByClient(idUser: string) {
        const list = await this.Budget.find({idUser}).sort({code: -1})

        return list
    }

    async create(data: IBudgetDTO) {
            // contar quantos pedidos existem
        const countOrders = await this.Budget.countDocuments()
        const newBudget = await this.Budget.create({
            ...data,
            code: Number(countOrders) + 1
        })
            
        return newBudget 
        
    }
    async update(budget: IBudgetDTO) {
        const newBudget = await this.Budget.findByIdAndUpdate(budget.id, budget, {new: true}) as IBudGetModel

        return newBudget
    }
    async delete(id: string) {
        await this.Budget.findByIdAndDelete(id)
       
    }
    async list() {
        const list = await this.Budget.find().sort({code: -1})

        return list
    }
    async findById(id: string){
        const budget = await this.Budget.findById(id)

        return budget
    }
}