import { IAuthor } from "./author.model";
import { IBookChapter } from "./bookchapter.model";
import { ICategories } from "./categories.model";
import { IPublisher } from "./publisher.model";
import { IBaseImage, UploadFile } from "./uploadFile.model";

export interface IBook {
    id?: string;
    name: string;
    publishYear: string;
    inputDay?: string;
    bookAuthors?: IBookAuthor[];
    authorName?: string;
    category?: string;
    bookImages?: IBookImage[];
    bookCategories?: IBookCategories[];
    bookPublishers?: IBookPublisher[];
    bookChapters?: IBookChapter[];
}

export interface IBookAuthor {
    id?: string;
    authorId?: string;
    bookId?: string;
    author: IAuthor;
}

export interface IBookPublisher {
    id?: string;
    publisherId?: string;
    bookId?: string;
    publisher: IPublisher;
}

export interface IBookSave extends IBook {
    authors?: string[];
    publishers?: string[];
    categories?: string[];
}

export interface IBookImage extends IBaseImage {
    bookId?: string;
}

export interface IBookCategories {
    id: string;
    categoryId: string;
    bookId: string;
    category: ICategories;
}