import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, of, tap } from 'rxjs';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { IReaderAccount } from 'src/app/models/reader-account.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  private readerAccount$: BehaviorSubject<IReaderAccount[]> = new BehaviorSubject<IReaderAccount[]>([]);
  private libraryCardId: string = "";

  constructor(
    private httpService: HttpService
  ) { }

  // getAll(id?: string) {
  //   return this.httpService.getAll<IReaderAccount[]>({ controller: 'Accounts' }, id).pipe(
  //     tap((x) => {
  //       if(x?.length) {
  //         this.readerAccount$.next(x)
  //       }
  //     }),
  //     concatMap(() => this.readerAccount$ ? this.readerAccount$.asObservable() : of([]))
  //   );
  // }

  getAll(id: string) {
    return this.httpService.getWithCustomURL<IReaderAccount[]>(
      { 
        controller: 'Accounts', 
        url: `Accounts/reader-account/get-by-id/${id}` 
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
    return this.httpService.getById<IReaderAccount>({controller: 'Accounts'}, id);
  }

  getLibraryCardOption() {
    return this.httpService.getOption<IComboboxOption[]>({ controller: 'LibraryCards' });
  }

  save(data: IReaderAccount) {
    return this.httpService.save<IReaderAccount>({ controller: 'Accounts', data, op: 'account-info'}).pipe(
      tap((res) => res ? this.updateReaderAccountState(res) : of())
    );
  }

  delete(id: string) {
    return this.httpService.delete({ controller: 'Accounts',url: `Accounts/reader-account/get-by-id/${id}`}, id).pipe(
      tap(() => this.updateReaderAccountState(undefined, id))
    );
  }

  setCurrentLibraryCard(id: string) {
    this.libraryCardId = id;
  }

  getCurrenLibraryCardID() { 
    return this.libraryCardId;
  }

  applyCategoryFilter(accDisplay: IReaderAccount[]) {
    this.readerAccount$.next(accDisplay);
  }

  search(data: IReaderAccount) {
    return this.httpService.search<IReaderAccount[]>({ controller: 'Accounts', data}).pipe(
      tap((res) => {
        if(res?.length) {
          // res.map(b => b.authorName = b.bookAuthors?.map(ba => ba.author.name).join(', '));

          this.readerAccount$.next(res);
        }
      })
    );
  }

  private updateReaderAccountState(res?: IReaderAccount, deletedRenderAccId?: string, ) {
    let old = this.readerAccount$.value;
  
    if(res) {
      const updated = old.find(p => p.id === res?.id);
      
      old = updated ? old.filter(p => p.id !== updated.id) : old;
  
      // res = {
      //   ...res,
      //   authorName: res.bookAuthors?.map(ba => ba.author.name).join(', ')
      // };

      this.readerAccount$.next([res, ...old]);
    } else if(deletedRenderAccId) {
      old = old.filter(p => p.id !== deletedRenderAccId);
  
      this.readerAccount$.next([...old]);
    }
  }
}
