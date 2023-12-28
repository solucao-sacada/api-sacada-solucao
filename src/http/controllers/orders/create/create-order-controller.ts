import { Accessories, Balcony, Client } from '@/dtos/ITypeOrderJSON'
import { makeCreateOrder } from '@/usecases/factories/orders/make-create-orders-usecase'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

interface IOrderJSON{
    idUser: string,
    accessories: Accessories,
    balcony: Balcony,
    client: Client,
    technician: string,
}

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const orderSchema = z.object({
                idUser: z.string().refine((value)=>{
                    try {
                        if(isValidObjectId(value)){
                            return true
                        }
                    } catch {
                        return false                        
                    }
                },{message: 'Id do usuário inválido'}),
                accessories: z.object({
                    aparador_aluminio: z.boolean(),
                    aparador_inox: z.boolean(),
                    selante: z.boolean(),
                }),
                balcony: z.object({
                    aluminium: z.object({
                        color: z.object({
                            black: z.boolean(),
                            bz1001: z.boolean(),
                            bz1002: z.boolean(),
                            bz1003: z.boolean(),
                            mat: z.boolean(),
                            white: z.boolean(),
                            other: z.string().nullable().optional(),
                        })
                    }),
                    aperture: z.object({
                        inside: z.boolean(),
                        locations: z.array(z.object({
                            distribution: z.string(),
                            door_distance: z.string(),
                            glasses: z.string(),
                            piece: z.string(),
                            stacking: z.string(),
                            tip: z.string(),
                        })),
                        outside: z.boolean(),
                    }),
                    beam: z.object({
                        position: z.object({
                            aligned: z.boolean(),
                            inside: z.boolean(),
                            outside: z.boolean(),
                        })
                    }),
                    dimensions: z.object({
                        data: z.array(z.array(z.string())),
                        total: z.string(),
                    }),
                    glass: z.object({
                        color: z.object({
                            bronze: z.boolean(),
                            colorless:z.boolean(),
                            green:z.boolean(),
                            tinted:z.boolean(),
                            other: z.string().nullable().optional(),
                        }),
                        laminated: z.boolean(),
                        tempered: z.boolean(),
                        thickness: z.object({
                            "10mm": z.boolean(),
                            "8mm": z.boolean(),
                        })
                    }),
                    levels: z.object({
                        full_aperture: z.string(),
                        measures: z.object({
                            data: z.array(z.array(z.string())),
                            highest_ceiling: z.string(),
                            highest_floor: z.string(),
                            lower_ceiling: z.string(),
                            lower_floor: z.string(),
                        })
                    }),
                    lock: z.object({
                        fechadura_para_porta: z.boolean(),
                        fechadura_vidro_vidro: z.boolean(),
                        pvc: z.boolean(),
                        ferro: z.boolean(),
                        '1520/1531': z.boolean(),
                        '3210/3211': z.boolean(),
                    }),
                    plumb: z.object({
                        left_wall: z.object({
                            bottom: z.string(),
                            top: z.string(),
                        }),
                        right_wall: z.object({
                            bottom: z.string(),
                            top: z.string(),
                        }),
                    }),
                    rails: z.object({
                        lower_rail: z.object({
                            built_in: z.object({
                                ref: z.object({
                                    A: z.boolean(),
                                    B: z.boolean(),
                                    C: z.boolean(),
                                    other:  z.string().or(z.boolean()).nullable().optional(),
                                })
                            }),
                            normal: z.object({
                                tip: z.object({
                                    A: z.boolean(),
                                    B: z.boolean(),
                                    C: z.boolean(),
                                    other:  z.string().or(z.boolean()).nullable().optional(),
                                })
                            }),
                            tab: z.object({
                                inside: z.boolean(),
                                outside: z.boolean(),
                                tip: z.object({
                                    A: z.boolean(),
                                    B: z.boolean(),
                                    C: z.boolean(),
                                    D: z.boolean(),
                                    E: z.boolean(),
                                }),
                            }),
                            tip: z.object({
                                built_in: z.boolean(),
                                normal: z.boolean(),
                                tab: z.boolean(),
                            })
                        }),
                        upper_rail: z.object({
                           tab: z.object({
                                inside: z.boolean(),
                                outside: z.boolean(),
                           }),
                           tip: z.object({
                                normal: z.boolean(),
                                tab: z.boolean(),
                           }), 
                        }),
                    }),
                    tip: z.object({
                        better_adjustment: z.boolean(),
                        defined: z.object({
                            glass_quantity: z.string(),
                            isDefined: z.boolean(),
                        })
                    }),
                    format: z.number(),

                }),
                client: z.object({
                        address: z.string(),
                        apartment: z.string(),
                        building: z.string(),
                        city: z.string(),
                        name: z.string(),
                        neighborhood: z.string(),
                        state: z.string(),

                }),
                technician: z.string().min(6),
            })

            const orderJSON = orderSchema.parse(request.body)
            
            const { idUser, accessories, balcony, client, technician } = orderJSON as unknown as IOrderJSON

            const createOrderUseCase = await makeCreateOrder()
            
            const user = await createOrderUseCase.execute({
                idUser,
                accessories,
                balcony: balcony as unknown as Balcony,
                client: client as unknown as Client,
                technician
            })
            
            return response.status(201).send(user)
          } catch (error) {
            throw error
        }
}   }
    
