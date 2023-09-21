export interface ICategory{
    id?: string;
    name: string;
    description: string;
}

export interface ICategorySave extends ICategory{
    bookCategory?: string[];
    bookCategoryID?: string[];
}