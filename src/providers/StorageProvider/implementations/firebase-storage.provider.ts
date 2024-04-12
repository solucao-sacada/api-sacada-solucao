import { IStorageProvider } from '../storage-provider.interface';
import 'dotenv/config';
import { Bucket } from '@google-cloud/storage';
import { firebaseApp } from '@/config/firebase-connection';

export class FirebaseStorageProvider implements IStorageProvider {
    private readonly bucket: Bucket;

    constructor() {
        this.bucket = firebaseApp.storage().bucket();
    }
    async downloadFile(fileName: string){
        try {

            const destination = `jsons/${fileName}`;
            const [file] = await this.bucket.file(destination).download();

            console.log('Arquivo baixado com sucesso.');

             return file

        } catch (error) {
            console.log(error)

            console.log('Error ao baixar a imagem');
        }
    }

    async deleteFile(fileName: string, folderStorage: string){
        try {
            if(!fileName){
               return
            }

            await this.bucket.file(`${folderStorage}/${fileName}`).delete()

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
                    this.bucket.upload(filePath, {
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
