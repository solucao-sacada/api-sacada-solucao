import { IStorageProvider } from '../storage-provider.interface';
import 'dotenv/config';
import {firebaseApp} from '@/config/firebase-storage-connection';
import { Bucket } from '@google-cloud/storage';

export class FirebaseStorageProvider implements IStorageProvider {
    private readonly storage: Bucket;

    constructor() {
        this.storage = firebaseApp as unknown as Bucket;
    }

    async uploadFile(fileName: string, pathFolder: string, folderStorage: string){
        try {
            const destination = `${folderStorage}/${fileName}`;
            const filePath = `${pathFolder}/${fileName}`;
            const uploadImage = await this.storage.upload(filePath, {
                destination,
            });
            if(!uploadImage){
                throw new Error('Error when uploading file');
            }
          
            const fileNameUploaded = uploadImage[0].metadata.name as string;
            const file = this.storage.file(fileNameUploaded);
            const fileRef = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491',
            })
            
            const URL = fileRef[0];
            return URL
    
        } catch (error) {
            console.log(error);
            console.log('Error when uploading file');
        }
    }
}
