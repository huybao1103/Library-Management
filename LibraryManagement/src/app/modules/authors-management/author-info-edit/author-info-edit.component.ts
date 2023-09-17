import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { IAuthor } from 'src/app/models/author.model';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { BookDetailFields } from '../../books-management/book-info-edit/book-info-form';
import { HttpService } from 'src/app/services/http-service.service';
import { AuthorDetailFields } from './autho-info.form';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorService } from '../service/author.service';
import { ExampleDetailFields } from '../../EXAMPLE-FORM';
import { map, tap } from 'rxjs';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-author-info-edit',
  templateUrl: './author-info-edit.component.html',
  styleUrls: ['./author-info-edit.component.css']
})
export class AuthorInfoEditComponent implements IDialogType, OnInit {
  uniqueId: string = uniqueId('author-info');
  title: string = '';

  addAuthorToBook: boolean = false;

  fields: FormlyFieldConfig[] = []; // abcxyz
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        author: this.getBookOption()
      }
    }
  };
  
  data: IAuthor = {
    name: '',
  }
  
  product: IAuthor[] = [
    {
      name: 'Huy Bao',
      mail: 'l.q.h.bao@gmail.com',
      phone: '0911721026'
    },
    {
      name: 'Huy Bao',
      mail: 'l.q.h.bao@gmail.com',
      phone: '0911721026'
    },
    {
      name: 'Huy Bao',
      mail: 'l.q.h.bao@gmail.com',
      phone: '0911721026'
    },
  ];

  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private toastSerivce: ToastService,
    private authorSerive: AuthorService,
    private confirmDialogService: ConfirmDialogService
  ) {
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Author";
    if (para.id) {
      this.title = "Edit Author Information";
      this.getAuthorById(para.id);
    } else {
      this.fields = AuthorDetailFields();
    }
  }
  
  ngOnInit(): void {

  }

  getAuthorById(id: string) {
    this.authorSerive.getAuthorById(id).subscribe({
      next: (res) => {
        if(res)
          this.data = res;

        this.fields = AuthorDetailFields();
      }
    })
  }

  getBookOption() {
    return this.authorSerive.getBookOption().pipe(map(res => res))
  }

  submit() {
    this.addAuthorToBook 
    ? this.confirmDialogService.showConfirmDialog(
        'New Author will be added to system and will be referenced to this book, do you want to continue ?',
        'Add Author to new Book confirmation'
      ).subscribe({
        next: (confirmed) => {
          if(confirmed) {
            this.addAuthorConfirmed();
          }
        }
      })
    : this.addAuthorConfirmed();
  }

  close() { this.modal.close() }

  private addAuthorConfirmed() {
    this.authorSerive.save(this.data).subscribe({
      next: (resp) => {
        console.log(resp);
        this.toastService.show(MessageType.success, 'Author info save success');

        this.addAuthorToBook ? this.modal.close(resp) : this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })    
  }
}
