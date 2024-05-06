import { Accessories, Balcony, Client } from "@/dtos/ITypeOrderJSON";
import { Schema, model, Document } from "mongoose";
import { IImageModel } from "./Images";
import { IStatusDTO } from "@/dtos/IStatusDTO";

export interface IOrdersModel extends Document {
    idUser: Schema.Types.ObjectId;
    code: number;
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
    observation?: string
    images?: string[]
    createdAt: Date
    updatedAt: Date
    status: IStatusDTO
    urlJSON?: string
    nameJSON?: string
}

export const OrdersSchema = new Schema<IOrdersModel>({
    idUser: { type: String, ref: "Users", required: true },
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
    status: {
        type: String,
        enum: Object.values(IStatusDTO), // Garantindo que apenas valores válidos do enum sejam aceitos
        default: IStatusDTO.CREATED // Definindo o valor padrão como 'pending'
    },
    urlJSON: {
        type: String,
        required: false
    },
    nameJSON: {
        type: String,
        required: false
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Images",
        required: false
    }]
},{timestamps: true});

export default model<IOrdersModel>("OrdersSchema", OrdersSchema);
