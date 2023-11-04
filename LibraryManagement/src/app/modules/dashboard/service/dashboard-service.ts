import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, map, of, tap } from 'rxjs';
import { IAccountInfo } from 'src/app/models/account.model';
import { IAuthor } from 'src/app/models/author.model';
import { IBook, IBookSave } from 'src/app/models/book.model';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { IPublisher } from 'src/app/models/publisher.model';
import { HttpService } from 'src/app/services/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private books$: BehaviorSubject<IBook[]> = new BehaviorSubject<IBook[]>([]);
  constructor(
    private httpService: HttpService

  ) { }

  getBooks(){
    return this.httpService.getWithCustomURL<IBook[]>({ controller: 'Books',url: 'Books'});
  }
  getStatistic() {
    return this.httpService.getWithCustomURL<IBookChapter[]>({ controller: 'BookChapters',url: 'BookChapters/get-statistic'});
  }
  getAuthors() {
    return this.httpService.getWithCustomURL<IAuthor[]>({ controller: 'Authors', url: 'Authors' });
  }
  getPublishers() {
    return this.httpService.getWithCustomURL<IPublisher[]>({ controller: 'Publishers',url: 'Publishers'});
  }
  getReaders() {
    return this.httpService.getWithCustomURL<IAccountInfo[]>({ controller: 'Accounts',url: 'Accounts/reader-account/get-list'});
  }
}
