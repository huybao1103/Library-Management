import { Role } from "./role-permission.model";

export interface IAccountInfo {
    id: string;
    email: string;
    roleId: string;
    role: Role;
    password: string
}