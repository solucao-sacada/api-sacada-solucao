import { Schema, model, Document } from "mongoose";

export interface IImageModel extends Document {
  idUser: Schema.Types.ObjectId
  idOrder: Schema.Types.ObjectId
  name: string
  hashName: string          
  url: string
}

export const ImageSchema = new Schema<IImageModel>({
    idUser: { type: Schema.Types.ObjectId, ref: "Users" },
    idOrder: { type: Schema.Types.ObjectId, ref: "Orders" },
    name: {
        type: String,
        required: false
    },
    hashName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
},{timestamps: true});

export default model<IImageModel>("ImageSchema", ImageSchema);
