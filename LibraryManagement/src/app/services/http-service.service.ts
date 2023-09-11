import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthor } from '../models/author.model';
import { Observable } from 'rxjs';
import { IQueryData } from '../models/query.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  getAll<T>(query: IQueryData): Observable<HttpResponse<T>> {
    // api/Authors
    return this.http.get<T>(
      `api/${query.controller}`,
      { observe: 'response'}
    );
  }

  getById<T>(query: IQueryData, id: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(
      `api/${query.controller}/get-by-id/${id}`,
      { observe: 'response'}
    );
  }

  // update<T>(query: IQueryData, id: string): Observable<HttpResponse<T>> {
  //   return this.http.put<T>(
  //     `api/${query.controller}/update/${id}`,
  //     query.data,
  //     { observe: 'response'}
  //   );
  // }

  delete<T>(query: IQueryData, id: string): Observable<HttpResponse<T>> {
    return this.http.delete<T>(
      `api/${query.controller}/delete/${id}`,
      { observe: 'response'}
    );
  }

  save<T>(query: IQueryData): Observable<HttpResponse<T>> {
    return this.http.post<T>(
      `api/${query.controller}/save`,
      query.data,
      { observe: 'response'}
    );
  }
}
