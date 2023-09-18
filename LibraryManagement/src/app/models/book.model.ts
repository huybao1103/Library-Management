import { IAuthor } from "./author.model";
import { UploadFile } from "./uploadFile.model";

export interface IBook {
    id?: string;
    name: string;
    publishYear: string;
    inputDay?: string;
    category: string;
    bookAuthors?: IBookAuthor[];
    authorName?: string;
    bookImages?: IBookImage[];
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

export interface IBookImage {
    id?: string;
    filePath?: string;
    fileId?: string;
    bookId?: string;
    base64: string;
    file: UploadFile;
}