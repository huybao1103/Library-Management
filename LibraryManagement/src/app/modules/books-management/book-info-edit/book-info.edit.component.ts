import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { BookDetailFields } from './book-info-form';
import { IAuthor } from 'src/app/models/author.model';

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
    formState: {}
  };
  
  data: IAuthor = {
    name: 'H'
  }
  
  constructor(
    private modal: NgbActiveModal,
    private _toastService: ToastService
  ) {
    this.fields = BookDetailFields();
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Book";
    if (para.id) {
      this.title = "Edit Book Information";
    }
  }

  submit() {
    console.log(this.data)
    console.log(this.form.invalid)
  }

  close() { this.modal.close() }
}
