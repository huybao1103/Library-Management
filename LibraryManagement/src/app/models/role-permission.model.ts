import { ModuleEnum } from "../enums/module-enum";

export interface Role {
    id?: string;
    name: string;
    roleModulePermissions: RoleModulePermission[];
}

export interface RoleModulePermission {
    id: string;
    module: ModuleEnum;
    all: boolean;
    access: boolean;
    detail: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    roleId: string;
}