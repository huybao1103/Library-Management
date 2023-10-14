import { IBook } from "./book.model";
import { IBookChapter } from "./bookchapter.model";
import { ILibraryCardInfo } from "./library-card.model";

export interface IBorrowHistoryInfo {
    id: string;
    borrowDate: string;
    endDate: string;
    status: number;
    bookChapterId: string;
    libraryCardId: string;
    bookChapter?: IBookChapter;
    libraryCard?: ILibraryCardInfo;
    bookId?: string;
}