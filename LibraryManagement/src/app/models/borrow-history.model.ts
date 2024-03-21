import { BookChapterStatus } from "../enums/book-chapter-status";
import { BorrowHistoryStatus } from "../enums/borrow-history-status";
import { IBook } from "./book.model";
import { IBookChapter } from "./bookchapter.model";
import { ILibraryCardInfo } from "./library-card.model";

export interface IBorrowHistoryInfo {
    id: string;
    borrowDate: string;
    endDate: string;
    status: BorrowHistoryStatus;
    bookChapterId: string;
    libraryCardId: string;
    bookChapter?: IBookChapter;
    libraryCard?: ILibraryCardInfo;
    bookId?: string;
    book?: IBook;
    lostOrDestroyedDate?: string;
}

export interface IEditRecordInfo {
    id: string;
    borrowDate: string;
    endDate: string;
    bookChapterId: string;
    libraryCardId: string;
    status: BorrowHistoryStatus;
}