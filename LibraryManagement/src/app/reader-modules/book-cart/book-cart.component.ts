import { FormGroup } from '@angular/forms';
import { BookService } from './../../modules/books-management/service/book.service';
import { BookCartService } from './../book-search/book-search/book-cart.service';
import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { first, of } from 'rxjs';
import { IBook } from 'src/app/models/book.model';
import { IDialogType } from 'src/app/models/modal/dialog';
import { LibraryCardStatus } from 'src/app/enums/library-card-status';
import { IBookCart } from 'src/app/models/cart.model';
import { BorrowHistoryStatus } from 'src/app/enums/borrow-history-status';
import { LibraryCardService } from 'src/app/modules/library-card-management/service/library-card.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { IRecordData } from 'src/app/modules/library-card-management/new-history-record/new-history-record.component';
import { BorrowRequestInfoField } from './borrow-request.form';

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
  
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      maxDate: undefined,
      minDate: undefined,
      onBorrowDateSelect: this.setBorrowDateRange.bind(this),
    }
  };

  data: any = {
    borrowDate: new Date().toISOString(),
    endDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  }
  
  bookCart: IBookCart[] = [];

  constructor(
    private modal: NgbActiveModal,
    private bookCartService: BookCartService,
    private bookService: BookService,
    private libraryCardService: LibraryCardService,
    private _toastService: ToastService
  ) {}

  dialogInit(para: any, routeConfig?: Route | undefined): void {
    this.getCart();
    this.fields = BorrowRequestInfoField();
    this.modal.update({size: 'lg'})
  }

  getCart() {
    const bookCart = this.bookCartService.getCartFromLocalStorage();
    if(bookCart)
      this.bookCart = bookCart;
  }

  setBorrowDateRange(value?: string) {
    const currentDate = new Date(this.data.borrowDate);
    this.options.formState.maxDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000);
    this.options.formState.minDate = new Date(currentDate.getTime());
    
    this.data.endDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString();
  }
  
  request() {
    const data = this.bookCart.map(item => {
      return {
        bookChapterId: item.bookChapterId,
        borrowDate: this.data.borrowDate,
        endDate: this.data.endDate,
        status: BorrowHistoryStatus.WaitingForTake,
        libraryCardId: item.libraryCardId,
      } as IRecordData
    })

    this.libraryCardService.saveRecord(data).pipe(
      first()
    ).subscribe({
      next: () => {
        this._toastService.show(MessageType.success, "Borrow Requested Successfully");
        this.bookCartService.clearCart();
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this._toastService.show(MessageType.error, err.error?.detail);

      }
    })
  }

  close() {
    this.modal.close()
  }
}
