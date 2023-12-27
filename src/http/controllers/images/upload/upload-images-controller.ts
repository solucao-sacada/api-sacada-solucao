import { env } from '@/env'
import { makeUpload } from '@/usecases/factories/images/make-upload-images-usecase'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import fs from 'fs'

export async function UploadImage (request: FastifyRequest, reply:FastifyReply){
    try {
        const ImageSchema = z.object({
            filename: z.string(),
            _buf: z.instanceof(Buffer),
        })

        const multipartformUploadSchema = z.object({
            idUser: z.object({
                value: z.string().uuid(),
            }),
            // receber array de imagens ou objeto de imagem e transformar em array
            images: z.union([ImageSchema, ImageSchema.array()]).transform((value) => {
                return Array.isArray(value) ? value : [value]
            }),
        })
        const {
            idUser,
            images,
        } = multipartformUploadSchema.parse(request.body)

        // criar array de nomes de arquivos
        const fileNamesFormated = []

        const folderTmp = env.NODE_ENV === 'production' ? env.FOLDER_TMP_PRODUCTION : env.FOLDER_TMP_DEVELOPMENT
        
        for(let image of images){
            // variavel para receber nome do arquivo formatado
            const fileNameFormated = `${randomUUID()} - ${image.filename}`;

            // subir arquivo na pasta local
            fs.writeFile(`${folderTmp}/${fileNameFormated}`, image._buf, (err)=>{
            if (err) {
                console.error('Erro ao salvar o arquivo:', err);
                return reply.status(400).send({ message: 'Erro ao salvar o arquivo'})
            }
            })

            fileNamesFormated.push(fileNameFormated)
        }
        
        const uploadImageUseCase = await makeUpload()
        
        const arrayImagesUploaded = await uploadImageUseCase.execute({
            idUser: idUser.value,
            names: fileNamesFormated
        })

        return reply.status(200).send(arrayImagesUploaded)

        } catch (error) {
        throw error
        }
}
    
