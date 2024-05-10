export interface IUserDTO{
    id?: string
    idCompany?: string | null
    name: string;
    email: string;
    password?: string | null;
    phone?: string;
    image?: string;
    role?: 'CUSTOMER' | 'ADMIN' | 'SUPER';
    firstAcess?: boolean;
    createdAt?: Date;
    emailActive?: boolean | null;
}