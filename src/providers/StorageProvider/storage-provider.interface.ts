export interface IStorageProvider {
    uploadFile(fileName: string, pathFolder: string, folderStorage: 'users' | 'orders'): Promise<string | undefined>;
    deleteFile(fileName: string, folderStorage:'users' | 'orders'): Promise<void>
}
