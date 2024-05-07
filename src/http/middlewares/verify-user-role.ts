import { MongooseUsersRepository } from "@/repositories/mongoose/mongoose-users-repository";
import { AppError } from "@/usecases/errors/AppError";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const userRepository = new MongooseUsersRepository();

    const user = await userRepository.findById(id);

    if (user?.role !== "ADMIN" && user?.role !== "SUPER") {
        throw new AppError("Permissão negada!");
    }

    return next();
}