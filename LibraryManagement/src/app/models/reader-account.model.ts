export interface IReaderAccount {
    getAccountById(id: string): unknown;
    save(data: IReaderAccount): unknown;
    id?: string;
    name: string;
    mail?: string;
    pass: string;
    status?: string;
}