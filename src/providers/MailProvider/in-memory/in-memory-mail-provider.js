"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryMailProvider = void 0;
class InMemoryMailProvider {
    constructor() {
        this.messages = [];
        this.messages = this.messages;
    }
    async findMessageSent(email) {
        const message = this.messages.find(message => message.email === email);
        return message;
    }
    async sendEmail(email, name, subject, link, pathTemplate) {
        const message = {
            email,
            name,
            subject,
            link,
            textTemplate: pathTemplate
        };
        this.messages.push(message);
    }
}
exports.InMemoryMailProvider = InMemoryMailProvider;
