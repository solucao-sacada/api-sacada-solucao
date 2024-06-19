export interface IBudgetDTO{
  id?: string
  idUser?: string
  code?: number
  name: string
  email: string 
  address: string         
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

  width: number
  height: number
}