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
            throw new AppError('Error find user')
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
            throw new AppError('Error find user')
        }
    }
    findByCPF(cpf: string): Promise<IUserModel | null> {
        throw new Error("Method not implemented.");
    }
    activeEmail(id: string, activate?: boolean | undefined): Promise<void | null> {
        throw new Error("Method not implemented.");
    }
    changePassword(id: string, password: string): Promise<void | null> {
        throw new Error("Method not implemented.");
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
            throw new AppError("Error finding user");
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
            throw new AppError("Error creating user");
        }
    }

    async findById(id: string) {
        try {
            return this.User.findById(id);
        } catch (error) {
            console.error(error);
            throw new AppError("Error find user");
        }
    }

    async findByEmail(email: string) {
        try {
            return this.User.findOne({ email });
        } catch (error) {
            console.error(error);
            throw new AppError("Error find user");
        }
    }

    async listByCompanyId(idCompanys: string) {
        try {
            return this.User.find({
                idCompanys,
            });
        } catch (error) {
            console.error(error);
            throw new AppError("Error find company");
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
            throw new AppError("Error updating user");
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
            throw new AppError("Error updating companysIds");
        }
    }

    async deleteById(id: string) {
        try {
            await this.User.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);
            throw new AppError("Error deleting user");
        }
    }
}
