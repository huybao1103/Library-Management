import { ModuleEnum, ModuleString } from './../../../enums/module-enum';
import { Component, OnInit } from '@angular/core';
import { RolePermissionService } from './service/role-permission.service';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { Role, RoleModulePermission } from 'src/app/models/role-permission.model';
import { first } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  roles: IComboboxOption[] = [];
  selectedRoleId: string = "";

  selectedRole: Role = {
    name: '',
    roleModulePermissions: [] 
  }

  ModuleEnum = ModuleEnum;
  ModuleString = ModuleString;

  roleName: string = "";

  childModule: ModuleEnum[] = [
    ModuleEnum.BookList,
    ModuleEnum.BookDetail,
    ModuleEnum.ReaderAccountManagement,
    ModuleEnum.EmployeeManagement,
  ]
  constructor(
    private roleService: RolePermissionService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRolesOption()
    .pipe(first())
    .subscribe({
      next: (resp) => {
        if(resp) {
          this.roles = resp;
          this.selectedRoleId = this.roles[0].value;

          this.roleChange(this.selectedRoleId);
        }
      }
    })
  }

  roleChange(roleId: string) {
    this.selectedRoleId = roleId;
    this.roleService.getRoleById(this.selectedRoleId)
    .pipe(first())
    .subscribe({
      next: (resp) => {
        if(resp) {
          this.selectedRole = resp;
          this.selectedRole.roleModulePermissions = this.selectedRole.roleModulePermissions
            .map(rmp => {
              const parentModule = this.getParentModule(rmp);
              return {
                ...rmp,
                parentModule: parentModule,
                parent_access: parentModule ? !rmp.access : false,
                parent_detail: parentModule ? !rmp.detail : false,
                parent_create: parentModule ? !rmp.create : false,
                parent_edit: parentModule ? !rmp.edit : false,
                parent_delete: parentModule ? !rmp.delete : false,
                parent_all: parentModule ? !rmp.all: false,
                all:  rmp.access === true 
                      && rmp.detail === true 
                      && rmp.delete === true 
                      && rmp.edit === true 
                      && rmp.create === true 
                      ? true : false
              }
            })
        }
      }
    })
  }

  getParentModule(childModule: RoleModulePermission) {
    const childModuleEnum = this.childModule.find(m => m === childModule.module);

    if(childModuleEnum) {
      switch (childModuleEnum) {
        case ModuleEnum.BookDetail:
        case ModuleEnum.BookList:
          return this.selectedRole.roleModulePermissions.find(parent => parent.module === ModuleEnum.BookManagement);

        case ModuleEnum.ReaderAccountManagement:
        case ModuleEnum.EmployeeManagement:
          return this.selectedRole.roleModulePermissions.find(parent => parent.module === ModuleEnum.AccountManagement);
      }
    }
    return undefined;
  }

  selectedChange(checked: boolean, module: RoleModulePermission, field: string) {
    if (
      module.module === ModuleEnum.BookManagement
      ||
      module.module === ModuleEnum.AccountManagement
    )
    {
      this.selectedRole.roleModulePermissions = this.selectedRole.roleModulePermissions
      .map(rmp => {
        switch (module.module) {
          case ModuleEnum.BookManagement:
            if(rmp.module === ModuleEnum.BookDetail || rmp.module === ModuleEnum.BookList) {
              return {
                ...rmp,
                [field]: checked,
                [`parent_${field}`]: !checked
              }
            }
            break;
          case ModuleEnum.AccountManagement:
            if(rmp.module === ModuleEnum.ReaderAccountManagement || rmp.module === ModuleEnum.EmployeeManagement) {
              return {
                ...rmp,
                [field]: checked,
                [`parent_${field}`]: !checked
              }
            }
            break;
        }
        return rmp
      })
    }
  }

  selectedAllChange(module: RoleModulePermission) {
    this.selectedRole.roleModulePermissions = this.selectedRole.roleModulePermissions
      .map(rmp => {
        if(rmp.id === module.id) {
          return {
            ...rmp,
            all: !rmp.all,
            access: !rmp.all,
            detail: !rmp.all,
            delete: !rmp.all,
            edit: !rmp.all,
            create: !rmp.all,
          }
        }
        return rmp
      })
  }

  saveChanges() {
    this.roleService.saveChange(this.selectedRole)
    .pipe(first())
    .subscribe({
      next: (resp) => {
        if(resp)
          this.toastService.show(MessageType.success, "Save permission changes success.")
      }
    })
  }

  newRole() {
    if(this.roleName) {
      this.roleService.newRole(this.roleName)
      .pipe(first())
      .subscribe({
        next: (resp) => {
          if(resp)
            this.roles.push({ label: this.roleName, value: resp })
  
          this.toastService.show(MessageType.success, "New Role has been added.")
          this.roleName = "";
        }
      })
    }
  }
}