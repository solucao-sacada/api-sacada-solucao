import { IStorageProvider } from '../storage-provider.interface';
import 'dotenv/config';
import { Bucket } from '@google-cloud/storage';
import { firebaseApp } from '@/config/firebase-connection';
import { AppError } from '@/usecases/errors/AppError';

export class FirebaseStorageProvider implements IStorageProvider {
    private readonly storage: Bucket;

    constructor() {
        this.storage = firebaseApp as unknown as Bucket;
    }

    async deleteFile(fileName: string, folderStorage: string){
        try {
            if(!fileName){
               return
            }

            await this.storage.file(`${folderStorage}/${fileName}`).delete()

        } catch (error) {
            console.log('Error ao deletar a imagem');
        }
    }

    async uploadFile(fileName: string, pathFolder: string, folderStorage: string){
        try {
            const destination = `${folderStorage}/${fileName}`;
            const filePath = `${pathFolder}/${fileName}`;
            console.log('filePath', filePath)
            console.log('destination', destination)
            const uploadImage = await this.storage.upload(filePath);

            if(!uploadImage){
                throw new AppError('Error ao fazer upload da imagem', 400);
            }
          
            // console.log('uploadImage', uploadImage)
            // console.log('uploadImage[0].metadata.name', uploadImage[0].metadata.name)
            // const fileNameUploaded = uploadImage[0].metadata.name as string;
            const file = await this.storage.file(filePath).download({
                destination
            });

            const x = file

            // console.log('file', file)
            // const fileRef = await file.getSignedUrl({
            //     action: 'read',
            //     expires: '03-09-2491',
            // })
            // console.log('fileRef', fileRef)
            
            const URL = 'fileRef[0]';
            return URL
    
        } catch (error) {
            console.log('Error ao fazer upload da imagem');
            console.log('error', error)
        }
    }
}
