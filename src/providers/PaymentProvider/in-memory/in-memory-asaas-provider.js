"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAsaasProvider = void 0;
const crypto_1 = require("crypto");
class InMemoryAsaasProvider {
    constructor(dayjsDateProvider) {
        this.dayjsDateProvider = dayjsDateProvider;
        this.payments = [];
        this.customers = [];
        this.installments = [];
    }
    async createPayment({ customer, billingType, value, dueDate, installmentCount, installmentValue, installment, description, externalReference, creditCard, creditCardHolderInfo, discount, fine, interest, remoteIp }) {
        const payment = {
            id: (0, crypto_1.randomUUID)(),
            customer,
            billingType,
            value,
            dueDate,
            installmentCount,
            installmentValue,
            installment,
            description,
            externalReference,
            creditCard,
            creditCardHolderInfo,
            discount,
            fine,
            interest,
            remoteIp
        };
        const instalmentsInfo = {
            id: payment.id,
            installments: (0, crypto_1.randomUUID)(),
            installmentCount: installmentCount,
            paymentValue: installmentValue,
        };
        this.payments.push(payment);
        this.installments.push(instalmentsInfo);
        let netValue = 0;
        let dateExpireDiscount = new Date('2023-12-19');
        const dateNow = this.dayjsDateProvider.dateNow();
        const verifyDiscountActive = this.dayjsDateProvider.compareIfBefore(dateNow, dateExpireDiscount);
        if (billingType === 'BOLETO' || billingType === 'PIX') {
            if (verifyDiscountActive) {
                netValue = Number(Math.abs(value - 0.99).toFixed(2));
            }
            else {
                netValue = Number(Math.abs(value - 1.99).toFixed(2));
            }
        }
        if (billingType === 'CREDIT_CARD') {
            if (verifyDiscountActive) {
                netValue = Math.abs((Number((value * 0.0199 + 0.49).toFixed(2)) - value));
            }
            else {
                netValue = Math.abs((Number((value * 0.0299 + 0.49).toFixed(2)) - value));
            }
        }
        if (billingType === 'CREDIT_CARD' && Number(installmentCount) <= 6) {
            if (verifyDiscountActive) {
                netValue = Math.abs((Number((value * 0.0249 + 0.49).toFixed(2)) - value));
            }
            else {
                netValue = Math.abs((Number((value * 0.0349 + 0.49).toFixed(2)) - value));
            }
        }
        if (billingType === 'CREDIT_CARD' && Number(installmentCount) > 6) {
            if (verifyDiscountActive) {
                netValue = Math.abs((Number((value * 0.0299 + 0.49).toFixed(2)) - value));
            }
            else {
                netValue = Math.abs((Number((value * 0.0399 + 0.49).toFixed(2)) - value));
            }
        }
        return {
            id: payment.id,
            customer: payment.customer,
            value: payment.value,
            netValue,
            billingType: payment.billingType,
            installment: instalmentsInfo.id,
            status: 'PAYMENT_RECEIVED',
            creditCard: payment.creditCard,
            dueDate: payment.dueDate,
            invoiceUrl: 'https://invoice.com',
            description: payment.description,
            externalReference,
            creditCardToken: (0, crypto_1.randomUUID)(),
        };
    }
    async createCustomer({ cpfCnpj, email, name, phone }) {
        const customer = {
            id: (0, crypto_1.randomUUID)(),
            cpfCnpj,
            email,
            name,
            phone
        };
        this.customers.push(customer);
        return customer;
    }
    async findUniqueInstallments(idInstallment) {
        const findInstallments = this.installments.find(installment => installment.id === idInstallment);
        if (!findInstallments) {
            return null;
        }
        return findInstallments;
    }
}
exports.InMemoryAsaasProvider = InMemoryAsaasProvider;
