import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, concatMap, of } from 'rxjs';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { HttpService } from 'src/app/services/http-service.service';
import { CustomDatePipe } from 'src/assets/pipes/custom-date.pipe';
import { IRecordData } from '../new-history-record/new-history-record.component';
import { IBorrowHistoryInfo, IEditRecordInfo } from 'src/app/models/borrow-history.model';

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
        if(x?.length) {
          x.map(i => i.expiryDate = this.dateParse(i.expiryDate));
          this.libraryCard$.next(x)
        }
      }),
      concatMap(() => this.libraryCard$ ? this.libraryCard$.asObservable() : of([]))
    );
  }

  getLibraryCardById(id: string) {
    return this.httpService.getById<ILibraryCardInfo>({controller: 'LibraryCards'}, id);
  }

  save(data: ILibraryCardInfo) {
    return this.httpService.save<ILibraryCardInfo>({ controller: 'LibraryCards', data, op: 'LibraryCard-info'}).pipe(
      tap((res) => res ? this.updateLibraryCardstate(res) : of())
    );
  }

  getLibraryCardOption() {
    return this.httpService.getOption<IComboboxOption>({ controller: 'LibraryCards' });
  }

  delete(id: string) {
    return this.httpService.delete<ILibraryCardInfo>({controller: 'LibraryCards'}, id).pipe(
      tap(() => this.updateLibraryCardstate(undefined, id))
    );
  }

  saveRecord(data: IRecordData[]) {
    return this.httpService.save({ controller: 'BorrowHistories', data });
  }

  editRecord(data: IEditRecordInfo) {
    return this.httpService.saveWithCustomURL({ controller: 'BorrowHistories', data, url:'BorrowHistories/edit-history-info' });
  }

  getLibraryCardByAccountId(accountId: string) {
    return this.httpService.getWithCustomURL<ILibraryCardInfo>({controller: 'LibraryCards', url: `LibraryCards/get-by-account-id/${accountId}`});
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

  private dateParse(dateString: string) {
    const date = new Date(dateString);

    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
  }
}
