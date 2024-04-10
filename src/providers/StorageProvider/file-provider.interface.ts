export interface IFileProvider {
    deleteFileTmp(fileName: string, folderPath: 'users' | 'orders' |'tmp' | 'json', destination: string): void
}