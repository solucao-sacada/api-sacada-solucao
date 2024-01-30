import { z } from 'zod'
import { Request, Response } from 'express'
import { makeUploadImagesToUser } from '@/usecases/factories/images/make-upload-images-to-user-usecase'

export class UploadImageToUserController{
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            console.log(request.file)
            const ImageSchemaFile = z.object({
                filename: z.string(),
                originalname: z.string()
            })
            
    
            const multipartformUploadSchema = ImageSchemaFile

            const {
                originalname,
                filename
            } = multipartformUploadSchema.parse(request.file)

            const ImageSchemaQuery = z.object({
                idUser: z.string(),
            })

            const {
                idUser,
            } = ImageSchemaQuery.parse(request.params)

            // criar array de nomes de arquivos
            const uploadImageUseCase = await makeUploadImagesToUser()
            
            const arrayImagesUploaded = await uploadImageUseCase.execute({
                idUser,
                imageInfo: {
                   name: originalname,
                   hashName: filename
                }
            })
    
            return response.status(200).send(arrayImagesUploaded)
    
            } catch (error) {
            throw error
            }
    }
}
    
