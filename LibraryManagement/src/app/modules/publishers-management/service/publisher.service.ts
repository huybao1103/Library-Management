import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { IPublisher } from 'src/app/models/publisher.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private publisher$: BehaviorSubject<IPublisher[]> = new BehaviorSubject<IPublisher[]>([]);
  
  constructor(
    private httpService: HttpService,
    private toastService: ToastService
    ) { }
    
  //api/Publishers
  getAll() {
    return this.httpService.getAll<IPublisher[]>({ controller: 'Publishers' }).pipe(
      tap((x) => {
        if(x?.length) 
          this.publisher$.next(x)
      }),
      concatMap(() => this.publisher$ ? this.publisher$.asObservable() : of([]))
    );
  }

  getPublisherById(id: string) {
    return this.httpService.getById<IPublisher>({controller: 'Publishers'}, id);
  }

  save(data: IPublisher) {
    return this.httpService.save<IPublisher>({ controller: 'Publishers', data, op: 'publisher-info'}).pipe(
      tap((res) => res ? this.updatePublisherState(res) : of())
    );
  }

  getPublisherOption() {
    return this.httpService.getOption<IComboboxOption>({ controller: 'Publishers' });
  }
  
  delete(id: string){
    return this.httpService.delete<IPublisher>({controller: 'Publishers'}, id).pipe(
      tap(() => this.updatePublisherState(undefined, id))
    );
  }

  private updatePublisherState(res?: IPublisher, deletedPublisherId?: string, ) {
    let old = this.publisher$.value;
  
    if(res) {
      const updated = old.find(p => p.id === res.id);
      
      old = updated ? old.filter(p => p.id !== updated.id) : old;
  
      this.publisher$.next([res, ...old]);
    } else if(deletedPublisherId) {
      old = old.filter(p => p.id !== deletedPublisherId);
  
      this.publisher$.next([...old]);
    }
  }
}
