export interface IBudgetDTO{
  id?: string
  idUser?: string
  code?: number
  client: string
  emailClient: string          
  price?: number

  aparador?: boolean
  selante?: boolean
  prolongador?: boolean
  chapaSuperior?: boolean
  chapaInferior?: boolean
  qtdAparador: number
  qtdProlongador: number
  qtdSelante: number
  area: number
  pricePlates: number
  priceGlasses: number
  priceAcessories: number
  priceProlongador: number
  priceKitSolutions: number
  tehnician: string
}