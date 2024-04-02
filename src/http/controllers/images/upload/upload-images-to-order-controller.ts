import { z } from 'zod'
import { Request, Response } from 'express'
import { makeUploadImagesToOrder } from '@/usecases/factories/images/make-upload-images-to-order-usecase'
import { makeCompressionImage } from '@/utils/comprresion-image'

export class UploadImageToOrderController{
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            console.log(request.files)
            const ImageSchemaFile = z.object({
                filename: z.string(),
                originalname: z.string(),
                destination: z.string(),
                path: z.string(),
            })
    
            const multipartformUploadSchema = z.array(ImageSchemaFile)

            const images = multipartformUploadSchema.parse(request.files)

            const ImageSchemaQuery = z.object({
                idOrder: z.string(),
            })
            
            const {
                idOrder,
            } = ImageSchemaQuery.parse(request.params)

    
            // criar array de nomes de arquivos
            const uploadImageUseCase = await makeUploadImagesToOrder()
            
            const arrayImagesUploaded = await uploadImageUseCase.execute({
                idOrder,
                imageInfo: images.map(image => {
                    makeCompressionImage(image.filename, image.destination, 'orders')
                    return {
                        name: image.originalname,
                        hashName: image.filename,
                        destination: image.destination,
                        path: image.path,
                    }
                })
            })
    
            return response.status(200).send(arrayImagesUploaded)
    
        } catch (error) {
            throw error
        }
    }
}
    
