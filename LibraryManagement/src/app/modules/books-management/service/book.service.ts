import { Injectable } from '@angular/core';
import { IBook, IBookSave } from 'src/app/models/book.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private httpService: HttpService
  ) { }

  getAll() {
    return this.httpService.getAll<IBook[]>({ controller: 'Books' });
  }

  getBookById(id: string) {
    return this.httpService.getById<IBook>({controller: 'Books'}, id);
  }

  getCategoriesOption() {
    return this.httpService.getOption<IComboboxOption[]>({ controller: 'Categories' });
  }
  
  save(data: IBookSave) {
    return this.httpService.save<IBookSave>({ controller: 'Books', data, op: 'author-info'});
  }

  delete(id: string) {
    return this.httpService.delete({ controller: 'Books' }, id);
  }
}
