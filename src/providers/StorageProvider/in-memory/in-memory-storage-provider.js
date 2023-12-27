"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStorageProvider = void 0;
class InMemoryStorageProvider {
    constructor() {
        this.storage = [];
    }
    async uploadFile(fileName, pathFolder, folderStorage) {
        if (!fileName) {
            return undefined;
        }
        this.storage.push(fileName);
        return fileName;
    }
}
exports.InMemoryStorageProvider = InMemoryStorageProvider;
