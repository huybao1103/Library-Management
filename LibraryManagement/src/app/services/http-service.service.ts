import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthor } from '../models/author.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  send(): Observable<IAuthor> {
    return this.http.get<IAuthor>(
      'https://localhost:7082/api/Authors'
    )
  }
}
