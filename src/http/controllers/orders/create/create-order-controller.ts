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
    observation?: string,
}

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
        try {
            const orderSchema = z.object({
                idUser: z.string().nullable().optional().refine((value)=>{
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
                    prolongador: z.boolean(),
                    qtdAparador:  z.number().nonnegative(),
                    qtdProlongador: z.number().nonnegative(),
                    qtdSelante: z.number().nonnegative(), 
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
                            other: z.string().nullable().optional().nullable().optional(),
                        })
                    }),
                    aperture: z.object({
                        inside: z.boolean(),
                        locations: z.array(z.object({
                            distribution: z.string().nullable().optional(),
                            door_distance: z.string().nullable().optional(),
                            glasses: z.string().nullable().optional(),
                            piece: z.string().nullable().optional(),
                            stacking: z.string().nullable().optional(),
                            tip: z.string().nullable().optional(),
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
                        data: z.array(z.array(z.string().nullable().optional())),
                        total: z.string().nullable().optional(),
                    }),
                    glass: z.object({
                        color: z.object({
                            bronze: z.boolean(),
                            colorless:z.boolean(),
                            green:z.boolean(),
                            tinted:z.boolean(),
                            other: z.string().nullable().optional().nullable().optional(),
                        }),
                        laminated: z.boolean(),
                        tempered: z.boolean(),
                        thickness: z.object({
                            "10mm": z.boolean(),
                            "8mm": z.boolean(),
                        })
                    }),
                    levels: z.object({
                        full_aperture: z.string().nullable().optional(),
                        measures: z.object({
                            data: z.array(z.array(z.string().nullable().optional())),
                            highest_ceiling: z.string().nullable().optional(),
                            highest_floor: z.string().nullable().optional(),
                            lower_ceiling: z.string().nullable().optional(),
                            lower_floor: z.string().nullable().optional(),
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
                            bottom: z.string().nullable().optional(),
                            top: z.string().nullable().optional(),
                        }),
                        right_wall: z.object({
                            bottom: z.string().nullable().optional(),
                            top: z.string().nullable().optional(),
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
                            glass_quantity: z.string().nullable().optional(),
                            isDefined: z.boolean(),
                        })
                    }),
                    format: z.number(),

                }),
                client: z.object({
                        address: z.string().nullable().optional(),
                        apartment: z.string().nullable().optional(),
                        building: z.string().nullable().optional(),
                        city: z.string().nullable().optional(),
                        internal_id: z.string().nullable().optional(),
                        name: z.string().nullable().optional(),
                        neighborhood: z.string().nullable().optional(),
                        state: z.string().nullable().optional(),

                }),
                technician: z.string().min(4).nullable().optional(),
                observation: z.string().nullable().optional(),
            })

            const orderJSON = orderSchema.parse(request.body)
            
            const { 
                idUser, 
                accessories, 
                balcony, 
                client, 
                technician,
                observation
            } = orderJSON as unknown as IOrderJSON

            const createOrderUseCase = await makeCreateOrder()
            
            const user = await createOrderUseCase.execute({
                idUser,
                accessories,
                balcony: balcony as unknown as Balcony,
                client: client as unknown as Client,
                technician,
                observation
            })
            
            return response.status(201).send(user)
          } catch (error) {
            throw error
        }
}   }
    
