import { IImageDTO } from "@/dtos/IImageDTO";
import { IImageRepository } from "../interfaces/interface-images-repository";
import { Model } from "mongoose";
import Images, { IImageModel } from "@/database/models/Images";

export class MongooseImagesRepository implements IImageRepository{
    private Image: Model<IImageModel> = Images;

    constructor(){}
    async listByOrder(idOrder: string): Promise<IImageModel[]> {
        try {
            const images = await this.Image.find({idOrder})
            return images
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    
    async upload(data: IImageDTO) {
        try {
            const image = await this.Image.create(data)
            return image
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async findById(id: string) {
        try {
            const image = await this.Image.findById(id)
            return image
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async findByHashName(name: string) {
        try {
            const image = await this.Image.findOne({hashName: name})
            return image
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async deleteById(id: string) {
        try {
            await this.Image.findByIdAndDelete(id)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}