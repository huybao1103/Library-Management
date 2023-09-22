import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map, of, switchMap, tap } from 'rxjs';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { IPublisher } from 'src/app/models/publisher.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private _publisher$?: BehaviorSubject<IPublisher[]>;


  constructor(
    private httpService: HttpService,
    private toastService: ToastService
  ) { }
  
  getAll() {
    return this.httpService.getAll<IPublisher[]>({ controller: 'Publishers' });
  }

  getPublisherById(id: string) {
    return this.httpService.getById<IPublisher>({controller: 'Publishers'}, id);
  }

  save(data: IPublisher) {
    return this.httpService.save<IPublisher>({ controller: 'Publishers', data, op: 'publisher-info'});
  }

  updatePublisherState(res: IPublisher): Observable<null> {
    this._publisher$?.next([...this._publisher$.value, res]);
    console.log(this._publisher$?.value)
    return of(null);
  }
}
