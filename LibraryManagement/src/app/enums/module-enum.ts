export enum ModuleEnum {
    BookManagement,
    BookList,
    BookDetail,
    CategoryManagement,
    AuthorManagement,
    PublisherManagement,
    LibraryCardManagement,
    LibraryCardDetail,
    Dashboard,
    AccountManagement,
    EmployeeManagement,
    ReaderAccountManagement
}

export const ModuleString: {[key in any]: string } = {
    [ModuleEnum.BookManagement]: 'Book Management',
    [ModuleEnum.BookList]: 'Book List',
    [ModuleEnum.BookDetail]: 'Book Detail',
    [ModuleEnum.CategoryManagement]: 'Category Management',
    [ModuleEnum.AuthorManagement]: 'Author Management',
    [ModuleEnum.PublisherManagement]: 'Publisher Management',
    [ModuleEnum.LibraryCardManagement]: 'Library Card Management',
    [ModuleEnum.LibraryCardDetail]: 'Library Card Detail',
    [ModuleEnum.Dashboard]: 'Dashboard',
    [ModuleEnum.AccountManagement]: 'Account Management',
    [ModuleEnum.EmployeeManagement]: 'Employee Management',
    [ModuleEnum.ReaderAccountManagement]: 'Reader Account Management'
}