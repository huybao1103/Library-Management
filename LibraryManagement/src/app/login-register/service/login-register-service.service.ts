import { Injectable } from '@angular/core';
import { IAccountInfo } from 'src/app/models/account.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterService {

  constructor(
    private httpService: HttpService
  ) { }

  login(data: any) {
    return this.httpService.saveWithCustomURL<IAccountInfo>({ controller: 'Accounts', url: 'Accounts/log-in', data });
  }
  
  register(data: any) {
    return this.httpService.saveWithCustomURL<any>({ controller: 'Accounts', url: 'Accounts/register', data });
  }

  resetPassword(data: any) {
    return this.httpService.saveWithCustomURL<any>({ controller: 'Accounts', url: 'Accounts/reset-password', data });
  }

  sendResetPasswordMail(data: any) {
    return this.httpService.saveWithCustomURL<any>({ controller: 'Accounts', url: 'Accounts/send-reset-password-mail', data });
  }
}
