export interface ITokenDTO{
    id?: string
    idUser: string;
    refreshToken: string;
    expireDate: Date;
    createdAt?: Date;
}