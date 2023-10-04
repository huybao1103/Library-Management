import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core/lib/models/fieldconfig';
import { uniqueId } from 'lodash';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { AuthorService } from 'src/app/modules/authors-management/service/author.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { BookChapterDetailFields } from './book-chapter-form';
import { BookChapterService } from '../service/book-chapter.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-chapter-info-edit',
  templateUrl: './book-chapter-info-edit.component.html',
  styleUrls: ['./book-chapter-info-edit.component.css']
})
export class BookChapterInfoEditComponent {
  bookId: string = "";

  uniqueId: string = uniqueId('book-chapter-info');
  title: string = '';
 
  addAuthorToBook: boolean = false;

  fields: FormlyFieldConfig[] = []; // abcxyz
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        // author: this.getBookOption()
      }
    }
  };
  
  data: IBookChapter = {
  }
  

  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private toastSerivce: ToastService,
    private bookChatperService: BookChapterService,
    private confirmDialogService: ConfirmDialogService
  ) {
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Chapter";
    if (para.id) {
      this.title = "Edit Chapter Information";
      this.getBookChapterById(para.id);
    } else {
      this.bookId = this.bookChatperService.getCurrentBookID();
      this.fields = BookChapterDetailFields();
    }
  }
  
  ngOnInit(): void {

  }

  getBookChapterById(id: string) {
    this.bookChatperService.getBookChapterByBookId(id).subscribe({
      next: (res) => {
        if(res)
          this.data = res;

        this.fields = BookChapterDetailFields();
      }
    })
  }

  // getBookOption() {
  //   return this.authorSerive.getBookOption().pipe(map(res => res))
  // }

  submit() {
    this.addAuthorToBook 
    ? this.confirmDialogService.showConfirmDialog(
        'New Chapter will be added to system and will be referenced to this book, do you want to continue ?',
        'Add Chapter to new Book confirmation'
      ).subscribe({
        next: (confirmed) => {
          if(confirmed) {
            this.addChapterConfirmed();
          }
        }
      })
    : this.addChapterConfirmed();
  }

  close() { this.modal.close() }

  private addChapterConfirmed() {
    if(!this.data.bookId) {
      this.data = {
        ...this.data,
        bookId: this.bookId
      };
    }
    this.bookChatperService.save(this.data).subscribe({
      next: (resp) => {
        console.log(resp);
        this.toastService.show(MessageType.success, 'Book chapter info save success');

        this.addAuthorToBook ? this.modal.close(resp) : this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })    
  }
}
