import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forEach, get } from 'lodash';
import { Observable, Subject, map, of, tap } from 'rxjs';
import { IQueryData } from '../models/query.model';
import { IPubSubMessage, PubsubService } from './pubsub.service';
import { ToastService } from './toast.service';

export interface IWatchData extends IPubSubMessage { }

interface IOpStorage {
  [op: string]: any;
}

export interface IResponseStationInfo {
  broadcaster: Subject<any>;
  observable: Observable<any>;
}

export interface IResponseBroadcaster {
  op: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  post(arg0: string, credentials: { email: string; password: string; }): Observable<any> {
    throw new Error('Method not implemented.');
  }
  private _responseStation: { [op: string]: IResponseStationInfo } = {};
  private opStorage: IOpStorage = {};
  private _responseBroadcaster: Subject<IResponseBroadcaster> | undefined;

  constructor(
    private http: HttpClient,
    private toastSevice: ToastService,
    private pubSubService: PubsubService
  ) {
    this.pubSubService.receiveMessage()?.pipe()
        .subscribe((data: IPubSubMessage) => this.handleQueryWatchData(data));

    this.getResponseReceiver().subscribe((response) => this._broadcastResult(response))
  }

  getAll<T>(query: IQueryData, id?: string) {
    // api/Authors
    return this.getDataFromResponse<T> (
      this.http.get<T>(
        `api/${query.controller}${id ? `/${id}` : ''}`,
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

  search<T>(query: IQueryData) {
    return this.getDataFromResponse<T> (
      this.http.post<T> (
        `api/${query.controller}/search`,
        query.data,
        { observe: 'response'}
      ),
      true,
      query
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

  saveWithCustomURL<T>(query: IQueryData) {
    return this.getDataFromResponse<T> (
      this.http.post<T> (
        `api/${query.url}`,
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

  getWithCustomURL<T>(query: IQueryData) {
    return this.getDataFromResponse<T> (
      this.http.get<T>(
        `api/${query.url}`,
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

  handleQueryWatchData(data: IPubSubMessage): void {
    (data.topic || []).forEach((item) => {
        forEach(this._responseStation, (key, data) => {
          if (data.startsWith(item)) {
            let storage = get(this.opStorage, data)
            if (storage) {
              this.getAll(storage)
                  .subscribe({
                      next: (_) => _,
                      error: (_) => {}
                  })
            }
          }
        });
    });
  }

  public getResponseReceiver(): Observable<IResponseBroadcaster> {
    return this._responseBroadcaster ? this._responseBroadcaster.asObservable() : of();
  }

  private _broadcastResult(response: IResponseBroadcaster): void {
    const responseStation = this._responseStation[response.op];
    if (!responseStation) {
      return;
    }

    responseStation.broadcaster.next(response.data);
  }
  
}
