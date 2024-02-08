export interface IFileProvider {
    deleteFileTmp(fileName: string, folderPath: 'users' | 'orders' |'tmp', destination: string): void
}