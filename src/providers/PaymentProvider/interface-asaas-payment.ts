export interface IChargeData{
    id?: string;
    customer: string,
    billingType: string,
    value: number,
    dueDate: string,
    installmentCount?: number | null,
    installmentValue?: number | null, 
    installment?: string,
    description?: string,
    externalReference: string,
    creditCardToken?: string
    creditCard?: {
        holderName?: string
        number?: string 
        expiryMonth?: string
        expiryYear?: string
        ccv: string
    }
    creditCardHolderInfo?: {
        name: string
        email: string
        cpfCnpj: string
        postalCode: string
        addressNumber: string
        addressComplement: string
        phone: string
    },
    discount?: {
        value: number,
        dueDateLimitDays: number
        type: string
    },
    fine?: {
        value: number
        type: string
    },
    interest?: {
        value: number
        type: string
    }
    remoteIp: string
}

export interface ICustomerData{
    id?: string
    name: string
    email: string
    cpfCnpj: string
    phone?: string
}

export interface IAsaasProvider{
    createPayment(data:IChargeData): Promise<any | undefined>
    createCustomer(data:ICustomerData): Promise<ICustomerData | undefined>
    findUniqueInstallments(idInstallment: string): Promise<any | null>
}