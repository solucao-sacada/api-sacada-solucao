import { Message } from "./in-memory/in-memory-mail-provider";

export interface IClient{
    name: string
    email: string
    address: string
}
export interface IPedidoJSON {
    price: string
    width: string
    height: string
    client: IClient
}

export interface IAttachment {
    filename: string
    path: string
}

export interface IMailProvider {
    sendEmail(
        email: string, 
        name:string, 
        subject:string, 
        link:string | null, 
        pathTemplate:string,
        pedido?: IPedidoJSON | null,
        attachmentPath?: IAttachment[] | null
    ): Promise<void>

    findMessageSent(email: string): Promise<Message>
}