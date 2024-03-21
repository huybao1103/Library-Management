import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { IPublisher } from 'src/app/models/publisher.model';
import { IAuthor } from 'src/app/models/author.model';
import { IBook, IBookImage } from 'src/app/models/book.model';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BookChapterService {
  private bookchapter$: BehaviorSubject<IBookChapter[]> = new BehaviorSubject<IBookChapter[]>([]);

  private bookId: string = "";
  
  constructor(
    private httpService: HttpService,
    private toastService: ToastService
    ) { }
    
  //api/BookChapters
  getAll(id: string) {
    return this.httpService.getWithCustomURL<IBookChapter[]>(
      { 
        controller: 'BookChapters', 
        url: `BookChapters/get-by-id/${id}` 
      }
    ).pipe(
      tap((x) => {
        if(x?.length) 
          this.bookchapter$.next(x)
      }),
      concatMap(() => this.bookchapter$ ? this.bookchapter$.asObservable() : of([]))
    );
  }

  getBookChapterByBookId(id: string) {
    return this.httpService.getById<IBookChapter>({controller: 'BookChapters'}, id);
  }

  save(data: IBookChapter) {
    return this.httpService.save<IBookChapter>({ controller: 'BookChapters', data, op: 'book-chapter'}).pipe(
      tap((res) => res ? this.updateBookChapterState(res) : of())
    );
  }

  getBookChapterOption(bookId: string) {
    return this.httpService.getWithCustomURL<IComboboxOption[]>({ controller: 'BookChapters', url: `BookChapters/option/${bookId}` });
  }
  
  delete(id: string){
    return this.httpService.delete<IBookChapter>({controller: 'BookChapters'}, id).pipe(
      tap(() => this.updateBookChapterState(undefined, id))
    );
  }

  setCurrentBookId(id: string) {
    this.bookId = id;
  }

  getCurrentBookID() { 
    return this.bookId;
  }

  private updateBookChapterState(res?: IBookChapter, deletedBookChapterId?: string, ) {
    let old = this.bookchapter$.value;
  
    if(res) {
      const updated = old.find(p => p.id === res.id);
      
      old = updated ? old.filter(p => p.id !== updated.id) : old;
  
      this.bookchapter$.next([res, ...old]);
    } else if(deletedBookChapterId) {
      old = old.filter(p => p.id !== deletedBookChapterId);
  
      this.bookchapter$.next([...old]);
    }
  }

  GetIdentifyId(bookId: string) {
    return this.httpService.getPlainTextWithCustomURL({ controller: 'BookChapters', url: `BookChapters/get-book-chapter-identifyId/${bookId}` });
  }
}
