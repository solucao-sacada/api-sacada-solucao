import Companies, { ICompanyModel } from "@/database/models/Companies";
import { ICompanyRepository } from "../interfaces/interface-companies-repository";
import { Model } from "mongoose";
import { ICompanyDTO } from "@/dtos/Company";

export class MongooseCompanyRepository implements ICompanyRepository {
    private Company: Model<ICompanyModel> = Companies;
    
    async findByUser(idUser: string) {
        try {
            return await this.Company.findOne({ idUser });
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async findByTradingName(tradingName: string){
        try {
            return await this.Company.findOne({ tradingName });
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async create(company: ICompanyDTO) {
        try {
            const newCompany = await this.Company.create(company);

            return newCompany
        } catch (error) {
            console.error(error);
            throw new Error("Error creating company");
        }
    }
    
    async findById(id: string){
        try {
            return await this.Company.findById(id)
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async findByLegalName(legalName: string) {
        try {
            return await this.Company.findOne({ legalName });
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async findByCNPJ(cnpj: string) {
        try {
            return await this.Company.findOne({ cnpj });
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async update(company: ICompanyDTO) {
        try {
            const newCompany = await this.Company.findByIdAndUpdate(company.id, company, {new: true}) as ICompanyModel

            return newCompany
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async delete(id: string){
        try {
            await this.Company.findByIdAndDelete(id)
        } catch (error) {
            console.error(error);
        }
    }
}