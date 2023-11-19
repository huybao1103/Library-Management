import { Injectable } from '@angular/core';
import { IAccountInfo } from '../models/account.model';
import { get } from 'lodash';
import { ModuleEnum } from '../enums/module-enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentAccount: IAccountInfo | undefined;

  constructor(
    private router: Router
  ) { }

  updateSession(account: IAccountInfo) {
    this.currentAccount = {...account};

    const value = JSON.stringify(this.currentAccount);
    localStorage.setItem(`user_${this.currentAccount.id}`, value);
  }

  clearSession() {
    localStorage.removeItem(`user_${this.currentAccount?.id}`);
    this.currentAccount = undefined;
  }

  getCurrentAccount() {
    // this.clearSession();
    const value = localStorage.getItem(`user_${this.currentAccount?.id}`);
    if(value) {
      this.currentAccount = JSON.parse(value);
      return this.currentAccount;
    }
    this.router.navigate(['/login'])
    return undefined;
  }

  getModulePermission(module: ModuleEnum) {
    return this.currentAccount?.role.roleModulePermissions.find(rmp => rmp.module === module);
  }
}
