import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private httpService: HttpService
  ) { }
}