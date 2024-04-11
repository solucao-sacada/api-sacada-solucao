import { env } from "@/env";
import { IFileProvider } from "../file-provider.interface";
import fs from 'fs'
import "dotenv/config"

export class FileTMPProvider implements IFileProvider{
    deleteFileTmp(fileName: string, destination: string){
        try {
            if(env.NODE_ENV === 'test'){
                destination = env.FOLDER_TMP_DEVELOPMENT
            }
            console.log(`${destination}/${fileName}`)

            // Verifique se o arquivo existe antes de tentar excluí-lo
            if (!fs.existsSync(`${destination}/${fileName}`)) {
                return
            }
            // Exclua o arquivo
            fs.unlinkSync(`${destination}/${fileName}`);
        } catch (error) {
            throw error
        }
    }
}