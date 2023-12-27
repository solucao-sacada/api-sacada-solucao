import sgMail from '@sendgrid/mail';
import { env } from "@/env";
import 'dotenv/config'
import fs from 'node:fs'
import { readFile } from 'fs/promises'
import handlebars from "handlebars";
import { IMailProvider} from '../interface-mail-provider';
import { Message } from '../in-memory/in-memory-mail-provider';

export class MailProvider implements IMailProvider{
    constructor(){
        sgMail.setApiKey(env.SENDGRID_API_KEY)
    }
    findMessageSent(email: string): Promise<Message> {
        throw new Error('Method not implemented.');
    }

    async sendEmail(
        email: string, 
        name:string, 
        subject:string, 
        link:string | null, 
        pathTemplate:string,
        ) {
        try {
            // ler arquivo handlebars
            const readTemplate = fs.readFileSync(pathTemplate).toString("utf-8");
            // compilar o arquivo handlebars
            const compileTemplate = handlebars.compile(readTemplate);
            // passar variables for template
            const htmlTemplate = compileTemplate({name, link, email});

            const msg = {
                to: `${email}`, // Para 
                from: 'nao-responder@ocularlaserbrasil.com.br', // De
                subject: subject, // Assunto
                html: htmlTemplate,
              };
           await sgMail.send(msg);
        } catch (error) {
            console.log('Error to send email')
            console.log(error);
        }
    }
}