declare namespace Express {
    export interface Request {
        user: {
            id: string;
            role: Role;
            token: string;
        };
    }
}
