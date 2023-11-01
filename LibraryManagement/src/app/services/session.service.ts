import { Injectable } from '@angular/core';
import { IAccountInfo } from '../models/account.model';
import { get } from 'lodash';
import { ModuleEnum } from '../enums/module-enum';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentAccount: IAccountInfo | undefined;

  constructor(
  ) { }

  updateSession(account: IAccountInfo) {
    this.currentAccount = {...account};

    const value = JSON.stringify(this.currentAccount);
    localStorage.setItem('user', value);
  }

  clearSession() {
    this.currentAccount = undefined;
    localStorage.setItem('user', '');
  }

  getCurrentAccount() {
    const value = localStorage.getItem('user');
    if(value) {
      this.currentAccount = JSON.parse(value);
      return this.currentAccount;
    }
    return undefined;
  }

  getModulePermission(module: ModuleEnum) {
    return this.currentAccount?.role.roleModulePermissions.find(rmp => rmp.module === module);
  }
}
