import { Accessories, Balcony, Client } from "@/dtos/ITypeOrderJSON";
import { Schema, model, Document } from "mongoose";

export interface IOrdersModel extends Document {
    idUser: Schema.Types.ObjectId;
    accessories: Accessories
    balcony: Balcony
    client: Client
    technician: string
}

export const OrdersSchema = new Schema<IOrdersModel>({
    idUser: { type: Schema.Types.ObjectId, ref: "Users", required: true },
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
    }
});

export default model<IOrdersModel>("OrdersSchema", OrdersSchema);
