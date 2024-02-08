import { Accessories, Balcony, Client } from "@/dtos/ITypeOrderJSON";
import { Schema, model, Document } from "mongoose";
import { IImageModel } from "./Images";

export interface IOrdersModel extends Document {
    idUser: Schema.Types.ObjectId;
    code: number;
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
    observation?: string
    images?: IImageModel[]
}

export const OrdersSchema = new Schema<IOrdersModel>({
    idUser: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    code: {
        type: Number,
        unique: true,
        required: false
    },
    accessories: {
        type: Object,
        required: true
    },
    balcony: {
        type: Object,
        required: true
    },
    client: {
        type: Object,
        required: true
    },
    technician: {
        type: String,
        required: true
    },
    observation: {
        type: String,
        required: false,
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Images",
        required: false
    }]
},{timestamps: true});

export default model<IOrdersModel>("OrdersSchema", OrdersSchema);
