import { Request, Response } from "express"
import { Role } from "./verify-token-jwt"

export function verifyUserRole(
    verifyToleRoleOne: string, 
    verifyToleRoleTwo?: string,
    verifyToleRoleThree?: string,
    verifyToleRoleFour?: string    
    ){
    return async (request: Request, reply: Response) => {
        const {role} = request.user

        if(role !== verifyToleRoleOne && 
            role !== verifyToleRoleTwo && 
            role !== verifyToleRoleThree &&
            role !== verifyToleRoleFour){
            return reply.status(401).send({message: "Unauthorized."})
        }
    }        
}