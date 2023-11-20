export enum ModuleEnum {
    BookManagement,
    BookList,
    BookChapter,
    CategoryManagement,
    AuthorManagement,
    PublisherManagement,
    LibraryCardManagement,
    LibraryCardBorrowHistory,
    Dashboard,
    AccountManagement,
    EmployeeManagement,
    ReaderAccountManagement,
    RolePermissionManagement,
    BookSearch,
    BookCategory
}

export const ModuleString: {[key in any]: string } = {
    [ModuleEnum.BookManagement]: 'Book Management',
    [ModuleEnum.BookList]: 'Book List',
    [ModuleEnum.BookChapter]: 'Book Chapter',
    [ModuleEnum.CategoryManagement]: 'Category Management',
    [ModuleEnum.AuthorManagement]: 'Author Management',
    [ModuleEnum.PublisherManagement]: 'Publisher Management',
    [ModuleEnum.LibraryCardManagement]: 'Library Card Management',
    [ModuleEnum.LibraryCardBorrowHistory]: 'Library Card Borrow History',
    [ModuleEnum.Dashboard]: 'Dashboard',
    [ModuleEnum.AccountManagement]: 'Account Management',
    [ModuleEnum.EmployeeManagement]: 'Employee Management',
    [ModuleEnum.ReaderAccountManagement]: 'Reader Account Management',
    [ModuleEnum.RolePermissionManagement]: 'Role Permission Management',
    [ModuleEnum.BookSearch]: 'Book Search',
    [ModuleEnum.BookCategory]: 'Book Category'
}