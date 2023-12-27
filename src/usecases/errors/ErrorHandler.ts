import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";

export async function errorHandler(error: Error, request: Request, response: Response, next: NextFunction){
    console.log(error);
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
        });
    }

    if(error instanceof ZodError){
        return response.status(400).send({message: 'Campo inválido', issues: error.format()})
      }

    return response.status(500).json({
        status: "error",
        message: `Internal server - error: ${error.message}`,
    });
}
