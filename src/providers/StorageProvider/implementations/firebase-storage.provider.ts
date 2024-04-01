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

    async uploadFile(fileName: string, pathFolder: string, folderStorage: string):Promise<string> {
        try {
            console.log(fileName)
            console.log(pathFolder)
            console.log(folderStorage)
            const destination = `${fileName}`;
            const filePath = `${pathFolder}`;
            
            // Inicia uma Promise
            return new Promise((resolve, reject) => {
                const uploadImage = this.storage.upload(filePath, {
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
                            console.log(URL);
                            
                            // Resolve a Promise com o URL
                            resolve(URL);
                        });
                    }
                });
            });
        } catch (error) {
            // Trate os erros aqui se necessário
            console.error(error);
            throw error;
        }
    }
    

    // async uploadFile(fileName: string, pathFolder: string, folderStorage: string){
    //     try {

    //         console.log(fileName)
    //         console.log(pathFolder)
    //         console.log(folderStorage)
    //         const destination = `${fileName}`;
    //         const filePath = `${pathFolder}`;
    //         let URL = ''
            
    //         const uploadImage = this.storage.upload(filePath, {
    //             destination,
    //         }, (err, file)=>{
    //             if(file){
    //                 file.makePublic(async () => {
    //                     URL = file.publicUrl()
    //                     console.log(URL)

    //                     return URL
    //                 });
    //             }
    //         });
    //         return URL
    //         // {
    //         //     destination,
    //         // },
    //         // (err, file)=>{
    //         //     if(file){
    //         //         file.makePublic(async ()=> {
    //         //             console.log(file.name)
    //         //             console.log(file.publicUrl())
    //         //             retru
    //         //         });
    //         //     }
    //         // }
    //         // if(!uploadImage){
    //         //     throw new AppError('Error ao fazer upload da imagem', 400);
    //         // }
          
    //         // const fileNameUploaded = uploadImage[0].metadata.name as string;
    //         // const file = this.storage.file(fileNameUploaded);
    //         // const fileRef = await file.getSignedUrl({
    //         //     action: 'read',
    //         //     expires: '03-09-2491',
    //         // })
    //         // const URL = fileRef[0];

    //         // console.log('upload de imagem feito com sucesso')
    
    //     } catch (error) {
    //         console.log('Error ao fazer upload da imagem');
    //         console.log('error', error)
    //     }
    // }
}
