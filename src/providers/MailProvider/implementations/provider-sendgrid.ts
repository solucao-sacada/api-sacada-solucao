import sgMail from '@sendgrid/mail';
import { env } from "@/env";
import 'dotenv/config'
import fs from 'node:fs'
import { readFile } from 'fs/promises'
import handlebars from "handlebars";
import { IAttachment, IMailProvider, IPedidoJSON} from '../interface-mail-provider';
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
        pedido: IPedidoJSON,
        attachmentPDF?: IAttachment[] | null
        ) {
        try {
            // ler arquivo handlebars
            const readTemplate = fs.readFileSync(pathTemplate).toString("utf-8");
            // compilar o arquivo handlebars
            const compileTemplate = handlebars.compile(readTemplate);
            // passar variables for template
            const htmlTemplate = compileTemplate({name, link, email, pedido});

            // enviar email
           await sgMail.send({
            to: `${email}`, // Para 
            from: '4codesolutionss@gmail.com', // De
            subject: subject, // Assunto
            html: htmlTemplate,
            attachments: attachmentPDF ? attachmentPDF.map(({
                filename,
                path
            }: IAttachment) =>{
                return {
                    content: fs.readFileSync(path).toString('base64'), // Ler o arquivo PDF e converter para base64
                    filename,
                    type: 'application/pdf',
                    disposition: 'attachment'
                }
            }) : undefined
          });
        } catch (error) {
            console.log('Error to send email')
            console.log(error);
        }
    }
}