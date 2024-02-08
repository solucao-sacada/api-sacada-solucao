import { Schema, model, Document } from "mongoose";

export interface IBudGetModel extends Document {
  idUser: Schema.Types.ObjectId
  client: string
  emailClient: string          
  price: number
}

export const BudGetSchema = new Schema<IBudGetModel>({
    idUser: { type: Schema.Types.ObjectId, ref: "Users", required: true},
    client: {
        type: String,
        required: true
    },
    emailClient: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps: true});

export default model<IBudGetModel>("BudGetSchema", BudGetSchema);
