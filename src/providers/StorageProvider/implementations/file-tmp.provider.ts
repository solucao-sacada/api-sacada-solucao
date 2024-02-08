import { env } from "@/env";
import { IFileProvider } from "../file-provider.interface";
import fs from 'fs'
import "dotenv/config"

export class FileTMPProvider implements IFileProvider{
    deleteFileTmp(fileName: string, folderPath: string, destination: string){
        try {

            if(env.NODE_ENV === 'test'){
                destination = env.FOLDER_TMP_DEVELOPMENT
            }
            if(folderPath === 'tmp'){
                // Verifique se o arquivo existe antes de tentar excluí-lo
                // Verifique se o arquivo existe antes de tentar excluí-lo
                if (!fs.existsSync(`${destination}/${fileName}`)) {
                    return
                }

                // Exclua o arquivo
                return fs.unlinkSync(`${destination}/${fileName}`);
            }

            // Verifique se o arquivo existe antes de tentar excluí-lo
            if (!fs.existsSync(`${destination}/${folderPath}/${fileName}`)) {
                return
            }

            // Exclua o arquivo
            fs.unlinkSync(`${destination}/${folderPath}/${fileName}`);
        } catch (error) {
            throw error
        }
    }
}