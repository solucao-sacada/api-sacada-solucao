import { hash } from "bcrypt";
import connectionMongoDB from "../mongo-connection";
import { ObjectId } from "mongodb";
import { AppError } from "@/usecases/errors/AppError";

async function seedSuper(){
   try {
    const connection = await connectionMongoDB()

    let findUserExist = await connection.collection('users').findOne({
        _id: new ObjectId('6582f71b88dcbec1aedfc9ad')
    })

    if(findUserExist){
        throw new AppError('User Super already exists!')
    }

    const admin = await connection.collection('users').insertOne({
        _id: new ObjectId('6582f71b88dcbec1aedfc9ad'),
        name: 'Super Admin',
        email: 'super@email.com',
        password: await hash('159753', 8),
        cpfCnpj: '123-159-789-88',
        phone: '77-77777-7777',
        role: 'SUPER',
    })
    findUserExist = await connection.collection('users').findOne({
        _id: admin.insertedId._id
    })
    process.exit(0)
   } catch (error) {
        console.error('User Super already exists!')
        process.exit(0)
   }
}
seedSuper()