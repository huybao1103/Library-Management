import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleEnum } from '../enums/module-enum';
import { LoginRegisterService } from '../login-register/service/login-register-service.service';
import { IAccountInfo } from '../models/account.model';
import { HttpService } from './http-service.service';
import { BehaviorSubject, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentAccount: IAccountInfo | undefined;
  private currentAccountState$: BehaviorSubject<IAccountInfo | undefined> = new BehaviorSubject<IAccountInfo | undefined>(undefined); 

  constructor(
    private router: Router,
    private loginService: LoginRegisterService,
    private httpService: HttpService
  ) { }

  updateSession(account: IAccountInfo) {
    this.currentAccount = {...account};
    this.currentAccountState$.next(this.currentAccount);

    const value = JSON.stringify(this.currentAccount);
    localStorage.setItem(`user_${this.currentAccount.id}`, value);
    localStorage.setItem('current_user', value);
  }

  clearSession() {
    localStorage.removeItem(`user_${this.currentAccount?.id}`);
    this.currentAccount = undefined;
  }

  getCurrentAccount() {
    const value = localStorage.getItem(this.currentAccount?.id ? `user_${this.currentAccount?.id}` : 'current_user');
    
    if(value) {
      this.currentAccount = JSON.parse(value);
      if(this.currentAccount?.role.name !== 'Reader')
        this.reloadPerrmission();

      this.currentAccountState$.next(this.currentAccount);
      return this.currentAccount;
    }
    this.router.navigate(['/login'])
    return undefined;
  }

  getCurrentAccountState() {
    return this.currentAccountState$.asObservable();
  }

  getModulePermission(module: ModuleEnum) {
    return this.currentAccount?.role.roleModulePermissions.find(rmp => rmp.module === module);
  }

  reloadPerrmission() {
    const id = this.currentAccount?.id;
    this.httpService.getWithCustomURL<IAccountInfo>({ controller: 'Accounts', url: `Accounts/reload-permission/${id}` })
    .pipe(first())
    .subscribe({
      next: resp => {
        if(resp) {
          this.updateSession(resp);
        }
      }
    })
  }
}
