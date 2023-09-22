export interface ICategory{
    id?: string;
    name: string;
    description: string;
    // categories?: string[];
   
    // bookCategoryID?: string[];
}

export interface ICategorySave extends ICategory{
    Category?: string[];
}