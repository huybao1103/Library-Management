import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http-service.service';
import { Observable } from 'rxjs';
import { iAccount } from 'src/app/models/account';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(
    private httpService: HttpService
    ) { }

    login(email: string, password: string): Observable<iAccount> {
      const credentials = { email, password };
      return this.httpService.post('https://localhost:7082/api/Accounts/sign-in', credentials);
    }
}
