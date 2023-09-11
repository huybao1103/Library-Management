import { Component } from '@angular/core';
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

@Component({
  selector: 'app-author-info-edit',
  templateUrl: './author-info-edit.component.html',
  styleUrls: ['./author-info-edit.component.css']
})
export class AuthorInfoEditComponent implements IDialogType {
  uniqueId: string = uniqueId('author-info');
  title: string = '';

  fields: FormlyFieldConfig[] = []; // abcxyz
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {}
  };
  
  data: IAuthor = {
    name: '',
    mail: '',
    phone: ''
  }
  
  constructor(
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private httpService: HttpService,
    private toastSerivce: ToastService
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
  
  getAuthorById(id: string) {
    this.httpService.getById<IAuthor>({controller: 'Authors'}, id).subscribe({
      next: (resp) => {
        
        if(resp.body)
        this.data = resp.body;
      
        console.log(this.data);
      }
    })
    this.fields = AuthorDetailFields();
  }

  submit() {
    console.log(this.form.invalid)
    this.httpService.save({ controller: 'Authors', data: this.data}).subscribe({
      next: (resp) => {
        console.log(resp.body)
        this.toastSerivce.show(MessageType.success, 'Author info save success');
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastSerivce.show(MessageType.error, err.error.detail);
      }
    })
  }

  close() { this.modal.close() }
}
