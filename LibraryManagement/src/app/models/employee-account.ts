import { IAccountInfo } from './account.model';
import { Role } from './role-permission.model';
  export interface IEmployee {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    citizenId?: string;
    birthDate?: string;
    joinDate?: string;
    accountId?: string;
    account?: IAccountInfo;
    roleId?: string;
    role?: Role;
    password?: string;
}