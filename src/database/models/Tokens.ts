import { Schema, model, Document } from "mongoose";

export interface ITokensModel extends Document {
    idUser: string;
    token: string;
    expireDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export const TokensSchema = new Schema<ITokensModel>({
    idUser: { type: String, ref: "Users", required: true },
    token: { type: String, required: true },
    expireDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<ITokensModel>("TokensSchema", TokensSchema);
