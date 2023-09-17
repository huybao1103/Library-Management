import { IAuthor } from "./author.model";

export interface IBook {
    id?: string;
    name: string;
    publishYear: string;
    inputDay?: string;
    category: string;
    bookAuthors?: IBookAuthor[];
}

export interface IBookAuthor {
    id?: string;
    authorId?: string;
    bookId?: string;
    author: IAuthor;
}

export interface IBookSave extends IBook {
    authors?: string[];
    publishers?: string[];
}