import { Schema, model, Document } from "mongoose";

export interface IBudGetModel extends Document {
  idUser: Schema.Types.ObjectId
  code: number;
  client: string
  emailClient: string          
  price: number

  aparador?: boolean
  selante?: boolean
  prolongador?: boolean
  chapaSuperior?: boolean
  chapaInferior?: boolean
  qtdAparador: number
  qtdProlongador: number
  qtdSelante: number
  area: number
  pricePlates: number
  priceGlasses: number
  priceAcessories: number
  priceProlongador: number
  priceKitSolutions: number
}

export const BudGetSchema = new Schema<IBudGetModel>({
    idUser: { type: Schema.Types.ObjectId, ref: "Users", required: true},
    code: {
        type: Number,
        unique: true,
        required: false
    },
    client: {
        type: String,
        required: true
    },
    emailClient: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    aparador: {
        type: Boolean,
        required: false
    },
    selante: {
        type: Boolean,
        required: false
    },
    prolongador: {
        type: Boolean,
        required: false
    },
    chapaSuperior: {
        type: Boolean,
        required: false
    },
    chapaInferior: {
        type: Boolean,
        required: false
    },
    qtdAparador: {
        type: Number,
        required: true
    },
    qtdProlongador: {
        type: Number,
        required: true
    },
    qtdSelante: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    pricePlates: {
        type: Number,
        required: true
    },
    priceGlasses: {
        type: Number,
        required: true
    },
    priceAcessories: {
        type: Number,
        required: true
    },
    priceProlongador: {
        type: Number,
        required: true
    },
    priceKitSolutions: {
        type: Number,
        required: true
    }
},{timestamps: true});

export default model<IBudGetModel>("BudGetSchema", BudGetSchema);
