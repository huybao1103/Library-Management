export interface UploadFile {
    id?: string;
    fileName: string
}

export interface IBaseImage {
    id?: string;
    filePath?: string;
    fileId?: string;
    base64: string;
    file: UploadFile;
}