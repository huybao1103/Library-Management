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
  private _author$?: BehaviorSubject<IAuthor[]>;


  constructor(
    private httpService: HttpService,
    private toastService: ToastService
  ) { }
  
  getAll() {
    return this.httpService.getAll<IAuthor[]>({ controller: 'Authors' });
  }

  getAuthorById(id: string) {
    return this.httpService.getById<IAuthor>({controller: 'Authors'}, id);
  }

  save(data: IAuthor) {
    return this.httpService.save<IAuthor>({ controller: 'Authors', data, op: 'author-info'});
  }

  getBookOption() {
    return this.httpService.getOption<IComboboxOption>({ controller: 'Authors' });
  }

  updateAuthorState(res: IAuthor): Observable<null> {
    this._author$?.next([...this._author$.value, res]);
    console.log(this._author$?.value)
    return of(null);
  }
}
