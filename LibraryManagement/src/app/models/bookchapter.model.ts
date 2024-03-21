import { IBook } from "./book.model";
import { IBorrowHistoryInfo } from "./borrow-history.model";

export interface IBookChapter {
    id?: string;
    identifyId?: string;
    status?: number;
    description?: string;
    bookId?: string;
    chapter?: string;
    book?: IBook;
    quantity?: number
    borrowHistories?: IBorrowHistoryInfo[];
}