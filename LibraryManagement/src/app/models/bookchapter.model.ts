import { IBook } from "./book.model";

export interface IBookChapter {
    id?: string;
    identifyId?: string;
    status?: string;
    description?: string;
    bookId?: string;
    chapter?: string;
    book?: IBook
}