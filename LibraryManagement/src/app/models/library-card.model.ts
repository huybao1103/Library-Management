import { LibraryCardStatus } from "../enums/library-card-status";
import { IBorrowHistoryInfo } from "./borrow-history.model";
import { IBaseImage } from "./uploadFile.model";

export interface ILibraryCardInfo {
    id?: string;
    name: string;
    class: string;
    expiryDate: string;
    status: LibraryCardStatus;
    description?: string;
    studentId: string;
    studentImages?: IStudentImage[];
    borrowHistories?: IBorrowHistoryInfo[];
}

export interface IStudentImage extends IBaseImage {
    studentId?: string
}