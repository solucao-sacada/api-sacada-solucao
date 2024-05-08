export interface IUserDTO{
    id?: string
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