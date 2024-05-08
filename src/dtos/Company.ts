export interface ICompanyDTO {
    id?:string
    idUser?: string | null;
    tradingName: string;
    legalName: string;
    cnpj: string;
    stateRegistration: string;
    streetAddress: string;
    num: number;
    complement: string;
    zipCode: number;
    neighborhood: string;
    city: string;
    state: string;
}