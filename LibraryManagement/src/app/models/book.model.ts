import { IAuthor } from "./author.model";
import { ICategories } from "./categories.model";
import { UploadFile } from "./uploadFile.model";

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
    categories?: string[];
}

export interface IBookImage {
    id?: string;
    filePath?: string;
    fileId?: string;
    bookId?: string;
    base64: string;
    file: UploadFile;
}

export interface IBookCategories {
    id: string;
    categoryId: string;
    bookId: string;
    category: ICategories;
}