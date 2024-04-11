export interface IStorageProvider {
    uploadFile(fileName: string, pathFolder: string, folderStorage: 'users' | 'orders' | 'jsons'): Promise<string | undefined>;
    deleteFile(fileName: string, folderStorage:'users' | 'orders' | 'jsons'): Promise<void>
    downloadFile(fileName: string): Promise<any>
}
