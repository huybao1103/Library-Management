import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, map, of, tap } from 'rxjs';
import { IBook, IBookSave } from 'src/app/models/book.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books$: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([]);

  constructor(
    private httpService: HttpService
  ) { }

  getAll(id?: string) {
    return this.httpService.getAll<IBook[]>({ controller: 'Books' }, id).pipe(
      tap((x) => {
        if(x?.length) {

          x.map(b => b.authorName = b.bookAuthors?.map(ba => ba.author.name).join(', '));
          this.books$.next(x)
        }
      }),
      concatMap(() => this.books$ ? this.books$.asObservable() : of([]))
    );
  }

  getBookById(id: string) {
    return this.httpService.getById<IBook>({controller: 'Books'}, id);
  }

  getCategoriesOption() {
    return this.httpService.getOption<IComboboxOption[]>({ controller: 'Categories' });
  }
  
  save(data: IBookSave) {
    return this.httpService.save<IBook>({ controller: 'Books', data, op: 'author-info'}).pipe(
      tap((res) => res ? this.updateBookState(res) : of())
    );
  }

  delete(id: string) {
    return this.httpService.delete({ controller: 'Books' }, id).pipe(
      tap(() => this.updateBookState(undefined, id))
    );
  }

  applyCategoryFilter(bookDisplay: IBook[]) {
    this.books$.next(bookDisplay);
  }

  search(data: IBookSave) {
    return this.httpService.search<IBook[]>({ controller: 'Books', data}).pipe(
      tap((res) => {
        if(res?.length) {
          res.map(b => b.authorName = b.bookAuthors?.map(ba => ba.author.name).join(', '));

          this.books$.next(res);
        }
      })
    );
  }

  getBookOption() {
    return this.httpService.getOption<IComboboxOption[]>({ controller: 'Books' });
  }

  getFreeBookOption() {
    return this.httpService.getWithCustomURL<IComboboxOption[]>({ controller: 'Books', url: 'Books/option/get-free-books' });
  }

  private updateBookState(res?: IBook, deletedBookId?: string, ) {
    let old = this.books$.value;
  
    if(res) {
      const updated = old.find(p => p.id === res?.id);
      
      old = updated ? old.filter(p => p.id !== updated.id) : old;
  
      res = {
        ...res,
        authorName: res.bookAuthors?.map(ba => ba.author.name).join(', ')
      };

      this.books$.next([res, ...old]);
    } else if(deletedBookId) {
      old = old.filter(p => p.id !== deletedBookId);
  
      this.books$.next([...old]);
    }
  }
}
