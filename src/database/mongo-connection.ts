import { env } from "@/env";
import { AppError } from "@/usecases/errors/AppError";
import "dotenv/config";

import mongoose from "mongoose";

export default async function connectionMongoDB(){
    try {
        const url =
           env.NODE_ENV === "test"
                ? env.DATABASE_TEST
                : env.DATABASE_DEV

        await mongoose.connect(url);

        const { connection } = mongoose;


        console.log("Conectado ao MongoDB");
        
        return connection
    } catch (error) {
        console.error(error);
        throw new AppError("Erro ao conectar ao MongoDB");
    }
}
