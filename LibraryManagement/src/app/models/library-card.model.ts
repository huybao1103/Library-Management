import { LibraryCardStatus } from "../enums/library-card-status";
import { IBaseImage } from "./uploadFile.model";

export interface ILibraryCardInfo {
    id?: string;
    name: string;
    class: string;
    expiryDate: string;
    status?: LibraryCardStatus;
    description?: string;
    studentId?: string;
    studentImages?: IStudentImage[];
}

export interface IStudentImage extends IBaseImage {
    studentId?: string
}