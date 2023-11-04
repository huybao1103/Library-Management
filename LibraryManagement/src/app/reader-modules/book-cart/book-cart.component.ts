import { BookService } from './../../modules/books-management/service/book.service';
import { BookCartService } from './../book-search/book-search/book-cart.service';
import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { IBook } from 'src/app/models/book.model';
import { IDialogType } from 'src/app/models/modal/dialog';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.css']
})
export class BookCartComponent implements IDialogType {
  uniqueId: string = '';
  width?: string | undefined;
  height?: string | undefined;
  size?: 'sm' | 'lg' | 'xl' | undefined;
  
  book: IBook | undefined;
  bookId: string = '';

  constructor(
    private modal: NgbActiveModal,
    private bookCartService: BookCartService,
    private bookService: BookService
  ) {}

  dialogInit(para: any, routeConfig?: Route | undefined): void {
    throw new Error('Method not implemented.');
  }

  getBook() {
    this.bookService.getBookById(this.bookId)
    .pipe(first())
    .subscribe({
      next: (resp) => {
        if(resp)
          this.book = resp;
      }
    })
  }

  close() {
    this.modal.close()
  }
}
