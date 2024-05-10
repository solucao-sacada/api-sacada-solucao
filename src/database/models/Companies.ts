import { Schema, model, Document } from "mongoose";

export interface ICompanyModel extends Document {
    idUser: string;
    tradingName: string;
    legalName: string;
    cnpj: string;
    stateRegistration: string;
    streetAddress: string;
    num: number;
    complement?: string | null;
    zipCode: number;
    neighborhood: string;
    city: string;
    state: string;	
}

export const CompanySchema = new Schema<ICompanyModel>({
    idUser: { type: String, ref: "Users", required: true},
    tradingName: { type: String, required: true, unique: true},
    legalName: { type: String, required: true, unique: true},
    cnpj: { type: String, required: true, unique: true},
    stateRegistration: { type: String, required: true},
    streetAddress: { type: String, required: true},
    num: { type: Number, required: true},
    complement: { type: String, required: false},
    zipCode: { type: Number, required: true},
    neighborhood: { type: String, required: true},
    city: { type: String, required: true},
    state: { type: String, required: true},
   
},{timestamps: true});

export default model<ICompanyModel>("CompanySchema", CompanySchema);
