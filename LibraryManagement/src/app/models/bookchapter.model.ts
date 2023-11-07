import { IBook } from "./book.model";

export interface IBookChapter {
    id?: string;
    identifyId?: string;
    status?: number;
    description?: string;
    bookId?: string;
    chapter?: string;
    book?: IBook
    lostOrDestroyedDate?: string;
}