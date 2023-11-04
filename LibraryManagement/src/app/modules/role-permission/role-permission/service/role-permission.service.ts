import { Role } from './../../../../models/role-permission.model';
import { Injectable } from '@angular/core';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(
    private httpService: HttpService
  ) { }

  getRoles() {
    return this.httpService.getAll<Role[]>({ controller: 'Roles' });
  }
  
  getRolesOption() {
    return this.httpService.getOption<IComboboxOption[]>({ controller: 'Roles' });
  }

  getRoleById(id: string) {
    return this.httpService.getById<Role>({ controller: 'Roles' }, id);
  }

  newRole(roleName: string) {
    return this.httpService.getWithCustomURL<string>({ controller: 'Roles', url: `Roles/new-role/${roleName}`})
  }

  saveChange(role: Role) {
    return this.httpService.saveWithCustomURL<Role>({ controller: 'Roles', url: 'Roles/save-change', data: role })
  }
}
