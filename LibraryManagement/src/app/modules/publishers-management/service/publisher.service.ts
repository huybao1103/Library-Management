import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map, of, switchMap, tap } from 'rxjs';
import { IPublisher } from 'src/app/models/publisher.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private publisher$?: BehaviorSubject<IPublisher[]>;


  constructor(
    private httpService: HttpService,
    private toastService: ToastService
  ) { }
  
  ////api/Publishers
  getAll() {
    return this.httpService.getAll<IPublisher[]>({ controller: 'Publishers' });
  }

  getPublisherById(id: string) {
    return this.httpService.getById<IPublisher>({controller: 'Publishers'}, id);
  }

  save(data: IPublisher) {
    return this.httpService.save<IPublisher>({ controller: 'Publishers', data, op: 'publisher-info'});
  }

  getPublisherOption() {
    return this.httpService.getOption<IComboboxOption>({ controller: 'Publishers' });
  }

  updatePublisherState(res: IPublisher): Observable<null> {
    this.publisher$?.next([...this.publisher$.value, res]);
    console.log(this.publisher$?.value)
    return of(null);
  }

  delete(id: string){
    return this.httpService.delete<IPublisher>({controller: 'Publishers'}, id);
  }
}
