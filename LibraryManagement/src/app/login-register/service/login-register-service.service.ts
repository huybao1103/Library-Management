import { Injectable } from '@angular/core';
import { IRegisterModel } from 'src/app/models/register.model';
import { tap } from 'rxjs';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterService {

  constructor(
    private httpService: HttpService
  ) { }

  save(data: IRegisterModel) {
    return this.httpService.save<IRegisterModel>({ url: '', controller: '', op: '', data }).pipe(
      tap((res) => {
        // handle here when res success
      })
    );
  }
}
