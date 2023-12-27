import "dotenv/config";
import "reflect-metadata";
import { app } from "./app";
import { env } from "./env";
import connectionMongoDB from "./database/mongo-connection";

connectionMongoDB();

app.listen(env.PORT, env.HOST, () => {
    console.log(`Servidor iniciado host: ${env.HOST} port:${env.PORT} . . . 🚀`);
});