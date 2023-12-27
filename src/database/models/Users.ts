import { Schema, model, Document } from "mongoose";

export interface IUserModel extends Document {
    name: string;
    email: string;
    password: string | undefined;
    phone: string;
    address: string;
    cpfCnpj: string;
    image: string;
    role: 'ADMIN' | 'COSTUMER' | 'SUPER';
    firstAcess: boolean;
    createdAt: Date;
    emailActive: boolean;
}

export const UserSchema = new Schema<IUserModel>({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    cpfCnpj: { type: String, required: false },
    image: { type: String, required: false },
    firstAcess: { type: Boolean, default: true },
    role: { type: String, default: "COSTUMER" },
    emailActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default model<IUserModel>("Users", UserSchema);
