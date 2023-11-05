import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, of, tap } from 'rxjs';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { IReaderAccount } from 'src/app/models/reader-account.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private readerAccount$: BehaviorSubject<ILibraryCardInfo[]> = new BehaviorSubject<ILibraryCardInfo[]>([]);
  private libraryCardId: string = "";

  constructor(
    private httpService: HttpService
  ) { }

  // getAll(id?: string) {
  //   return this.httpService.getAll<ILibraryCardInfo[]>({ controller: 'Accounts' }, id).pipe(
  //     tap((x) => {
  //       if(x?.length) {
  //         this.readerAccount$.next(x)
  //       }
  //     }),
  //     concatMap(() => this.readerAccount$ ? this.readerAccount$.asObservable() : of([]))
  //   );
  // }

  getAll(id: string) {
    return this.httpService.getWithCustomURL<ILibraryCardInfo[]>(
      { 
        controller: 'Accounts', 
        url: `Accounts/reader-account/get-list` 
      }
    ).pipe(
      tap((x) => {
        if(x?.length) 
          this.readerAccount$.next(x)
      }),
      concatMap(() => this.readerAccount$ ? this.readerAccount$.asObservable() : of([]))
    );
  }

  getReaderAccountById(id: string) {
    return this.httpService.getWithCustomURL<IReaderAccount>({controller: 'Accounts', url: `Accounts/reader-account/get-by-id/${id}`});
  }

  getLibraryCardOption() {
    return this.httpService.getOption<IComboboxOption[]>({ controller: 'LibraryCards' });
  }

  getNewLibraryCardOption() {
    return this.httpService.getWithCustomURL<IComboboxOption[]>({ controller: 'LibraryCards', url: 'LibraryCards/option/new-reader-account' });
  }

  save(data: IReaderAccount) {
    return this.httpService.saveWithCustomURL<IReaderAccount>({ controller: 'Accounts', data, url: 'Accounts/save-reader-account'})
  }

  delete(accountId: string) {
    return this.httpService.deleteWithCustomURL({ controller: 'Accounts',url: `Accounts/reader-account/remove/${accountId}`});
  }
}
