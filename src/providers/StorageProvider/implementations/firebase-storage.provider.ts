import { IStorageProvider } from '../storage-provider.interface';
import 'dotenv/config';
import { Bucket } from '@google-cloud/storage';
import { firebaseApp } from '@/config/firebase-connection';
import { AppError } from '@/usecases/errors/AppError';
import { env } from '@/env';

export class FirebaseStorageProvider implements IStorageProvider {
    private readonly storage: Bucket;

    constructor() {
        this.storage = firebaseApp as unknown as Bucket;
    }
    async downloadFile(fileName: string){
        try {
            const file = this.storage.file(fileName);
            const fileReponse = await file.download({destination: `${env.FIREBASE_BUCKET}/jsons/${fileName}`})

            return fileReponse
        } catch (error) {
            console.log('Error ao baixar a imagem');
        }
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

    async uploadFile(fileName: string, pathFolder: string, folderStorage: string):Promise<string> {
        try {
            const destination = `${folderStorage}/${fileName}`
            const filePath = `${pathFolder}`
            
            // Inicia uma Promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.storage.upload(filePath, {
                        destination,
                    }, (err, file) => {
                        if (err) {
                            reject(err);
                            return;
                        }
        
                        if (file) {
                            file.makePublic((err) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                
                                const URL = file.publicUrl();
                                
                                // Resolve a Promise com o URL
                                resolve(URL);
                            });
                        }
                    });
                }, 1000)
            });
        } catch (error) {
            // Trate os erros aqui se necessário
            console.error(error);
            throw error;
        }
    }
}
