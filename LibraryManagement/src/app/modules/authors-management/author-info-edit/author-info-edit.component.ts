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
import { AuthorService } from '../service/author.service';
import { ExampleDetailFields } from '../../EXAMPLE-FORM';
import { map } from 'rxjs';

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
    formState: {
      optionList: {
        author: this.getBookOption()
      }
    }
  };
  
  data: IAuthor = {
    name: '',
    mail: '',
    phone: ''
  }
  
  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private toastSerivce: ToastService,
    private authorSerive: AuthorService
  ) {
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Author";
    if (para.id) {
      this.title = "Edit Author Information";
      this.getAuthorById(para.id);
    } else {
      this.fields = ExampleDetailFields();
    }
  }
  
  getAuthorById(id: string) {
    this.authorSerive.getAuthorById(id).subscribe({
      next: (res) => {
        if(res)
          this.data = res;

        this.fields = ExampleDetailFields();
      }
    })
  }

  getBookOption() {
    return this.authorSerive.getBookOption().pipe(map(res => res))
  }

  submit() {
    console.log(this.data)
    // this.authorSerive.save(this.data).subscribe({
    //   next: (resp) => {
    //     this.toastService.show(MessageType.success, 'Author info save success');
    //     this.close();
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     console.log(err)
    //     this.toastService.show(MessageType.error, err.error?.detail);
    //   }
    // })
  }

  close() { this.modal.close() }
}
