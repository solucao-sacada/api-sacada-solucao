export interface ITokenDTO{
    id?: string;
    token: string;
    idUser: string;
    expireDate: Date;
    createdAt?: Date;
}