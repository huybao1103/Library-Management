import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(
    private httpService: HttpService
  ) { }
}
