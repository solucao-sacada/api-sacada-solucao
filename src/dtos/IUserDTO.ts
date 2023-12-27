export interface IUserDTO{
    id?: string
    name: string;
    email: string;
    password: string | undefined;
    phone?: string;
    address?: string;
    cpfCnpj: string;
    image?: string;
    role?: 'CUSTOMER' | 'ADMIN' | 'SUPER';
    firstAcess?: boolean;
    createdAt?: Date;
    emailActive?: boolean;
}