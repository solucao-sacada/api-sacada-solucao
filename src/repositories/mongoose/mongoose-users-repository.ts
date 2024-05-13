/* eslint-disable import/no-extraneous-dependencies */
import { Model } from "mongoose";
import { IUsersRepository } from "../interfaces/interface-users-repository";
import Users, { IUserModel } from "@/database/models/Users";
import { AppError } from "@/usecases/errors/AppError";
import { IUserDTO } from "@/dtos/IUserDTO";

export class MongooseUsersRepository implements IUsersRepository {
    private User: Model<IUserModel> = Users;
    async updateIdCompany(id: string, idCompany: string){
        try {
            await this.User.findByIdAndUpdate(id, {
                idCompany
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    findByIdCostumerPayment(id: string): Promise<IUserModel | null> {
        throw new Error("Method not implemented.");
    }
    async getUserSecurity(id: string){
        try {
            const user = await this.User.findById(id, {
                password: 0,
            })
            return user
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    findByCPF(cpf: string): Promise<IUserModel | null> {
        throw new Error("Method not implemented.");
    }
    async activeEmail(id: string, activate?: boolean | undefined) {
        await this.User.findByIdAndUpdate(id, {
            activate
        })
    }
    async changePassword(id: string, password: string) {
       await this.User.findByIdAndUpdate(id, {
            password
        })
    }
    updateIdCostumerPayment(idUser: string, idCustomerPayment: string): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }
    turnAdmin(id: string): Promise<IUserModel | null> {
        throw new Error("Method not implemented.");
    }

    async list(): Promise<IUserModel[]> {
        try {
            return await this.User.find();
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async create({
        name,
        email,
        password,
        phone,
        image,
    }: IUserDTO) {
        try {
            const user = await this.User.create({
                name,
                email,
                password,
                phone,
                image,
            });
            
            user.password = undefined;
            
            return user;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async findById(id: string) {
        try {
            return this.User.findById(id);
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async findByEmail(email: string) {
        try {
            return this.User.findOne({ email });
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async listByCompanyId(idCompanys: string) {
        try {
            return this.User.find({
                idCompanys,
            });
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async updateById({
        id,
        name,
        email,
        password,
        phone,
        image,
    }: IUserDTO) {
        try {
            const user = await this.User.findByIdAndUpdate(id, {
                name,
                email,
                password,
                phone,
                image,
            }) as IUserModel;

            return user;
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async updateCompanysIdsByCompanyId(idCompanys: string) {
        try {
            await this.User.updateMany(
                { idCompanys },
                { $pull: { idCompanys } }
            );
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async deleteById(id: string) {
        try {
            await this.User.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}
