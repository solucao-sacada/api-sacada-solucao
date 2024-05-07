/* eslint-disable import/no-extraneous-dependencies */
import { Model } from "mongoose";
import { ITokensRepository } from "../interfaces/interface-tokens-repository";
import { AppError } from "@/usecases/errors/AppError";
import { ITokenDTO } from "@/dtos/ITokenDTO";
import Tokens, { ITokensModel } from "@/database/models/Tokens";


export class MongooseTokensRepository implements ITokensRepository {
    private Token: Model<ITokensModel> = Tokens;

    async findByToken(token: string){
        try {
            return this.Token.findOne({
                refreshToken: token,
            });
        } catch (error) {
            console.log(error);
            throw new AppError("Error finding refresh tokens");
        }
    }
    findByUserId(idUser: string): Promise<ITokensModel | null> {
        throw new Error("Method not implemented.");
    }
    findByUserAndToken(idUser: string, token: string): Promise<ITokensModel | null> {
        throw new Error("Method not implemented.");
    }
    async create({
        idUser,
        expireDate,
        token
    }: ITokenDTO) {
        try {
            const createRefreshToken = await this.Token.create({
                idUser,
                expireDate,
                token
            });

            return createRefreshToken;
        } catch (error) {
            console.log(error);
            throw new AppError("Error creating refresh tokens");
        }
    }
    async findRefreshTokenByUserIdAndRefreshToken(
        idUsers: string,
        refreshToken: string
    ) {
        try {
            return this.Token.findOne({
                idUsers,
                refreshToken,
            });
        } catch (error) {
            console.log(error);
            throw new AppError("Error finding refresh tokens");
        }
    }
    async deleteById(id: string): Promise<void> {
        try {
            await this.Token.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            throw new AppError("Error deleting refresh tokens");
        }
    }
}
