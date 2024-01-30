import { makeDeleteImage } from '@/usecases/factories/images/make-delete-images-usecase';
import { Request, Response } from 'express';
import { z } from 'zod'

export class DeleteImageController{
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const imageSchemaParms = z.object({
                id: z.string(),
            })

            const { id } = imageSchemaParms.parse(request.params)
           
            const deleteImageCampingUseCase = await makeDeleteImage()
            
            await deleteImageCampingUseCase.execute({
               id
            })

            return response.status(200).send({message: "Imagem deletada com sucesso"})
          } catch (error) {
            throw error
          }
    }
       
}
    
