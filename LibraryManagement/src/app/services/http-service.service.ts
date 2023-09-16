import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthor } from '../models/author.model';
import { Observable, map, tap } from 'rxjs';
import { IQueryData } from '../models/query.model';
import { MessageType } from '../enums/toast-message.enum';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private toastSevice: ToastService
  ) { }

  getAll<T>(query: IQueryData) {
    // api/Authors
    return this.getDataFromResponse<T> (
      this.http.get<T>(
        `api/${query.controller}`,
        { observe: 'response'}
      )
    );
  }

  getById<T>(query: IQueryData, id: string) {
    return this.getDataFromResponse<T> (
      this.http.get<T>(
        `api/${query.controller}/get-by-id/${id}`,
        { observe: 'response'}
      )
    );
  }

  // update<T>(query: IQueryData, id: string): Observable<HttpResponse<T>> {
  //   return this.http.put<T>(
  //     `api/${query.controller}/update/${id}`,
  //     query.data,
  //     { observe: 'response'}
  //   );
  // }

  delete<T>(query: IQueryData, id: string) {
    return this.getDataFromResponse<T> (
      this.http.delete<T> (
        `api/${query.controller}/delete/${id}`,
        { observe: 'response'}
      )
    );
  }

  save<T>(query: IQueryData) {
    return this.getDataFromResponse<T> (
      this.http.post<T> (
        `api/${query.controller}/save`,
        query.data,
        { observe: 'response'}
      ),
      true,
      query
    );
  }

  getOption<T>(query: IQueryData) {
    return this.getDataFromResponse<T> (
      this.http.get<T>(
        `api/${query.controller}/option`,
        { observe: 'response'}
      )
    )
  }

  getDataFromResponse<T>(result$: Observable<HttpResponse<T>>, needReLoad?: boolean, query?: IQueryData) {
    return result$.pipe(
      tap(() => {needReLoad ? this.getAll<T>(query!) : ''}),
      map(res => {
        return res.body
      })
    );
  }
}
