import { Message } from "./in-memory/in-memory-mail-provider";

export interface IPedidoJSON {
    area: number
    price: string
    pricePlates: string
    priceGlasses: string 
    priceAcessories: string
    priceProlongador: string
    priceKitSolutions: string
  
    aparador?: boolean
    selante?: boolean
    prolongador?: boolean
    chapaSuperior: string 
    chapaInferior: string
    qtdAparador: number
    qtdProlongador: number
    qtdSelante: number
}

export interface IMailProvider {
    sendEmail(
        email: string, 
        name:string, 
        subject:string, 
        link:string | null, 
        pathTemplate:string,
        pedido: IPedidoJSON
    ): Promise<void>

    findMessageSent(email: string): Promise<Message>
}