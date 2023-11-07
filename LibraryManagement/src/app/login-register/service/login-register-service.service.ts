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
    return this.httpService.saveWithCustomURL<IAccountInfo>({ controller: 'Accounts', url: 'Accounts/log-in', data })
  }
}
