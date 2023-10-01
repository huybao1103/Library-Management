import { LibraryCardStatus } from "../enums/library-card-status";

export interface ILibraryCardInfo {
    id: string,
    name: string,
    class: string,
    expiryDate: string,
    status: LibraryCardStatus,
    description: string,
    studentId: string
}