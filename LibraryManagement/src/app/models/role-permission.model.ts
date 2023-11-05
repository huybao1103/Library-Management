import { ModuleEnum } from "../enums/module-enum";

export interface Role {
    id?: string;
    name: string;
    roleModulePermissions: RoleModulePermission[];
}

export interface RoleModulePermission {
    id: string;
    module: ModuleEnum;
    parentModule?: RoleModulePermission,
    all: boolean;
    access: boolean;
    detail: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    roleId: string;
    parent_all: boolean;
    parent_access: boolean;
    parent_detail: boolean;
    parent_create: boolean;
    parent_edit: boolean;
    parent_delete: boolean;
    disabledByParent: boolean;
}