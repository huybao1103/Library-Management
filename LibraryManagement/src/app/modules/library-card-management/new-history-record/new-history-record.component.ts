import { id } from './../../../../assets/all-modules-data/id';
import { BookChapterService } from './../../books-management/book-chapter/service/book-chapter.service';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Route } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IBorrowHistoryInfo } from 'src/app/models/borrow-history.model';
import { LibraryCardStatus } from 'src/app/enums/library-card-status';
import { BorrowHistoryInfoField } from './new-history-record.option';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';
import { LibraryCardService } from '../service/library-card.service';
import { BookService } from '../../books-management/service/book.service';
import { Subscription, filter, first, map, of, switchMap, tap } from 'rxjs';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpError } from '@microsoft/signalr';
import { HttpErrorResponse } from '@angular/common/http';
import { BorrowHistoryStatus } from 'src/app/enums/borrow-history-status';

@Component({
  selector: 'app-new-history-record',
  templateUrl: './new-history-record.component.html',
  styleUrls: ['./new-history-record.component.css']
})
export class NewHistoryRecordComponent implements IDialogType, OnDestroy {
  uniqueId: string = "";
  width?: string | undefined;
  height?: string | undefined;
  size?: 'xl';

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        book: this.bookService.getBookOption(),
        chapter: of([]),
      },
      maxDate: undefined,
      minDate: undefined,
      onBookSelected: this.onBookSelected.bind(this),
      onBorrowDateSelect: this.setBorrowDateRange.bind(this),
    }
  };
  
  data: IBorrowHistoryInfo = {
    id: '',
    borrowDate: new Date().toISOString(),
    endDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: BorrowHistoryStatus.Active,
    bookChapterId: '',
    libraryCardId: '',
    bookChapter: undefined
  }

  newRecordList: IRecordData[] = [];
  bookOption: IComboboxOption[] = [];
  chapterOption: IComboboxOption[] = [];

  subcription: Subscription = new Subscription;

  currentBookId: string = "";
  histories:  IBorrowHistoryInfo[] = [];
  
  remainingBookNumber: number = 3;

  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private libraryCardService: LibraryCardService,
    private bookService: BookService,
    private bookChapterService: BookChapterService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  dialogInit(para: any, routeConfig?: Route | undefined): void {
    this.data.libraryCardId = para.id;
    this.getLibraryCardById();

    this.modal.update({size: 'xl'});

    this.setBorrowDateRange();
    this.fields = BorrowHistoryInfoField();

    this.getOptionValue()
  }

  setBorrowDateRange(value?: string) {
    const currentDate = new Date(this.data.borrowDate);
      this.options.formState.maxDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000);
      this.options.formState.minDate = new Date(currentDate.getTime());
      
      this.data.endDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString();
  
      // this.fields = BorrowHistoryInfoField();
      this.cdr.detectChanges();
  }

  getLibraryCardById() {
    this.libraryCardService.getLibraryCardById(this.data.libraryCardId).pipe(first())
    .subscribe({
      next: (res) => {
        if(res?.borrowHistories?.length) {
          this.histories = res?.borrowHistories.filter
          (
            bh => bh.status === BorrowHistoryStatus.Expired 
            || bh.status === BorrowHistoryStatus.Active
          );
          
          this.remainingBookNumber = 3 - this.histories.length;
        }
      }
    })
  }

  onBookSelected(value: string) {
    if(value && value !== this.currentBookId) {
      this.currentBookId = value;
      this.bookChapterService.getBookChapterOption(this.currentBookId).subscribe({
        next: (resp) => {
          if(resp) {
            this.options.formState.optionList.chapter = of(resp)
            this.chapterOption = [...resp];
          }
          this.cdr.detectChanges();
        }
      })
    }
  }

  addRecord() {
    if(this.newRecordList.length < 3 && this.remainingBookNumber > 0) {
      if(!this.newRecordList.find(b => b.bookId === this.data.bookId && b.bookChapterId === this.data.bookChapterId)) {
        const bookName = this.bookOption.find(i => i.value === this.data.bookId)?.label;
        const bookChapter = this.chapterOption.find(i => i.value === this.data.bookChapterId)?.label;
    
        this.newRecordList.push({
          bookName: bookName,
          bookChapter: bookChapter,
          bookId: this.data.bookId,
          bookChapterId: this.data.bookChapterId,
          borrowDate: this.data.borrowDate,
          endDate: this.data.endDate
        })

        this.remainingBookNumber -= 1;
      } else {
        this._toastService.show(MessageType.error, "This book is already added!!!")
      }
    } else {
      this._toastService.show(MessageType.error, "Out of number of books can borrow!!!")
    }
  }

  removeBook(bookChapterId: string) {
    this.newRecordList = this.newRecordList.filter(r => r.bookChapterId !== bookChapterId);
    this.remainingBookNumber += 1;
  }

  getOptionValue() {
    this.bookService.getBookOption().pipe(
      first()
    ).subscribe({
      next : (resp) => {
        if(resp)
          this.bookOption = resp;
      }
    })
  }

  saveRecord() {
    const data = this.newRecordList.map(rc => {
      return {
        bookChapterId: rc.bookChapterId,
        borrowDate: rc.borrowDate,
        endDate: rc.endDate,
        status: LibraryCardStatus.Active,
        libraryCardId: this.data.libraryCardId,
      }
    })
    
    this.libraryCardService.saveRecord(data).pipe(
      first()
    ).subscribe({
      next: () => {
        this._toastService.show(MessageType.success, "New records save successfully");
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this._toastService.show(MessageType.error, err.error?.detail);

      }
    })
  }

  close() {
    this.modal.close();
  }
}

export interface IRecordData {
  id?: string;
  bookName?: string;
  bookChapter?: string;
  bookId?: string;
  bookChapterId: string;
  libraryCardId?: string;
  borrowDate: string;
  endDate: string;
  status?: number
}
