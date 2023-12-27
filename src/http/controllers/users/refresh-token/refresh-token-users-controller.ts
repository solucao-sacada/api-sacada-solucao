import { makeRefreshToken } from "@/usecases/factories/users/make-refresh-token-usecase";
import { Request, Response } from "express";
import { z } from "zod";

export class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const userSchema = z.object({
            refreshToken: z.string(), 
          })

          const { 
              refreshToken,
          } = userSchema.parse(request.body)

        const refreshTokenUseCase = await makeRefreshToken();
        
        const token = await refreshTokenUseCase.execute({
            token: refreshToken
        });

        return response.json(token);
    }
}
