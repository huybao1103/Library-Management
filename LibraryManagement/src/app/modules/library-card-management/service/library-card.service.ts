import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, concatMap, of } from 'rxjs';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryCardService {
  private libraryCard$: BehaviorSubject<ILibraryCardInfo[]> = new BehaviorSubject<ILibraryCardInfo[]>([]);


  constructor(
    private httpService: HttpService
  ) { }
  
  getAll() {
    return this.httpService.getAll<ILibraryCardInfo[]>({ controller: 'LibraryCards' }).pipe(
      tap((x) => {
        if(x?.length) 
          this.libraryCard$.next(x)
      }),
      concatMap(() => this.libraryCard$ ? this.libraryCard$.asObservable() : of([]))
    );
  }

  getAuthorById(id: string) {
    return this.httpService.getById<ILibraryCardInfo>({controller: 'LibraryCards'}, id);
  }

  save(data: ILibraryCardInfo) {
    return this.httpService.save<ILibraryCardInfo>({ controller: 'LibraryCards', data, op: 'author-info'}).pipe(
      tap((res) => res ? this.updateLibraryCardstate(res) : of())
    );
  }

  getAuthorOption() {
    return this.httpService.getOption<IComboboxOption>({ controller: 'LibraryCards' });
  }

  delete(id: string) {
    return this.httpService.delete<ILibraryCardInfo>({controller: 'LibraryCards'}, id).pipe(
      tap(() => this.updateLibraryCardstate(undefined, id))
    );
  }

  private updateLibraryCardstate(res?: ILibraryCardInfo, deletedCardId?: string, ) {
    let old = this.libraryCard$.value;
  
    if(res) {
      const updated = old.find(p => p.id === res.id);
      
      old = updated ? old.filter(p => p.id !== updated.id) : old;
  
      this.libraryCard$.next([res, ...old]);
    } else if(deletedCardId) {
      old = old.filter(p => p.id !== deletedCardId);
  
      this.libraryCard$.next([...old]);
    }
  }
}
