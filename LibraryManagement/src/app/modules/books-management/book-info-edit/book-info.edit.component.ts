import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { BookDetailFields } from './book-info-form';
import { IAuthor } from 'src/app/models/author.model';
import { AuthorInfoEditComponent } from '../../authors-management/author-info-edit/author-info-edit.component';
import { of } from 'rxjs';
import { AuthorDetailFields } from '../../authors-management/author-info-edit/author-info.form';
import { IBook, IBookSave } from 'src/app/models/book.model';
import { HttpService } from 'src/app/services/http-service.service';
import { BookService } from '../service/book.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.edit.component.html',
  styleUrls: ['./book-info.edit.component.css']
})
export class BookInfoEditComponent implements IDialogType {
  uniqueId: string = uniqueId('book-info');
  title: string = '';

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        author: of(),
        categories: this.bookService.getCategoriesOption()
      }
    }
  };
  
  data: IBook = {
    name: '',
    publishYear: '',
    category: ''
  };

  authors: IAuthor[] = [];
  publishers: any[] = [];

  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private bookService: BookService
  ) {
    this.fields = BookDetailFields();
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Book";
    if (para.id) {
      this.title = "Edit Book Information";
    }
  }

  addAccount() {
    const modalRef = this.modalService.open(AuthorInfoEditComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static'
    })

    modalRef.componentInstance.fields = AuthorDetailFields();
    modalRef.componentInstance.addAuthorToBook = true;
    modalRef.result.then((res) => this.authors.push(res));
  }

  submit() {
    if(this.data) {
      var bookModel: IBookSave = this.data;
      bookModel = {
        ...bookModel,
        authors: this.authors.map(a => a.id ? a.id : '')
      }
      this.bookService.save(bookModel).subscribe({
        next: (res) => {
          this._toastService.show(MessageType.success, 'Add Book successfully');
        },
        error: (err: HttpErrorResponse) => {
          this._toastService.show(MessageType.success, err.error?.detail);
        }
      })
    }
  }

  close() { this.modal.close() }
}
