import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { IEthrealProvider} from "../interface-ethreal-provider";
import { IServiceExecuted } from "@/usecases/servicesExecuted/create/create-services-executeds-usecases";

export class EtherealProvider implements IEthrealProvider {
  private client: Transporter;

  constructor(client: Transporter) {
    this.client = client
  }

  static async createTransporter(){
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    return new EtherealProvider(transporter);
  }

  async sendEmail(
        email: string, 
        name:string, 
        subject:string, 
        link:string | null, 
        pathTemplate:string,
        serviceExecuted: IServiceExecuted | null
  ): Promise<void> {
    if(!this.client){
        throw new Error("Ethereal client not initialized")
    }
    // ler arquivo handlebars
    const readTemplate = fs.readFileSync(pathTemplate).toString("utf-8");
    // compilar o arquivo handlebars
    const compileTemplate = handlebars.compile(readTemplate);
    // passar variables for template
    const htmlTemplate = compileTemplate({name, link, email, serviceExecuted});
    const message = await this.client.sendMail({
      to: email,
      from: "<noreply@clinic.com>",
      subject,
      html: htmlTemplate,
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
