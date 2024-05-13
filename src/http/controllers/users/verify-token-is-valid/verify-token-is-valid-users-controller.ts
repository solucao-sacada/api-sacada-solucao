import { makeVerifyTokenIsValid } from '@/usecases/factories/users/make-verify-token-is-valid-usecase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class VerifyTokenIsExistsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const tokenQuerySchema = z.object({
        token: z.string(),
      })
      const { token } = tokenQuerySchema.parse(request.params)
    
      const verifyTokenIsValidUseCase = await makeVerifyTokenIsValid()
    
      const isTokenValid = await verifyTokenIsValidUseCase.execute({
        token,
      })
    
      return response.status(200).send(isTokenValid)
    } catch (error) {
      throw error
    }
  }
}
