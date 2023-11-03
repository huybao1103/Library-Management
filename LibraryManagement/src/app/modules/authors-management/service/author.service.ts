import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map, of, switchMap, tap } from 'rxjs';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { IAuthor } from 'src/app/models/author.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private author$: BehaviorSubject<IAuthor[]> = new BehaviorSubject<IAuthor[]>([]);

  constructor(
    private httpService: HttpService,
    private toastService: ToastService
  ) { }
  
  getAll() {
    return this.httpService.getAll<IAuthor[]>({ controller: 'Authors' }).pipe(
      tap((x) => {
        if(x?.length) 
          this.author$.next(x)
      }),
      concatMap(() => this.author$ ? this.author$.asObservable() : of([]))
    );
  }

  getAuthorById(id: string) {
    return this.httpService.getById<IAuthor>({controller: 'Authors', op: 'author-info'}, id);
  }

  save(data: IAuthor) {
    return this.httpService.save<IAuthor>({ controller: 'Authors', data}).pipe(
      tap((res) => res ? this.updateAuthorState(res) : of())
    );
  }

  getAuthorOption() {
    return this.httpService.getOption<IComboboxOption>({ controller: 'Authors' });
  }

  delete(id: string) {
    return this.httpService.delete<IAuthor>({controller: 'Authors'}, id).pipe(
      tap(() => this.updateAuthorState(undefined, id))
    );
  }

  private updateAuthorState(res?: IAuthor, deletedAuthorId?: string, ) {
    let old = this.author$.value;
  
    if(res) {
      const updated = old.find(p => p.id === res.id);
      
      old = updated ? old.filter(p => p.id !== updated.id) : old;
  
      this.author$.next([res, ...old]);
    } else if(deletedAuthorId) {
      old = old.filter(p => p.id !== deletedAuthorId);
  
      this.author$.next([...old]);
    }
  }
}
