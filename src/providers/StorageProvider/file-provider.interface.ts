export interface IFileProvider {
    deleteFileTmp(fileName: string, destination: string): void
}