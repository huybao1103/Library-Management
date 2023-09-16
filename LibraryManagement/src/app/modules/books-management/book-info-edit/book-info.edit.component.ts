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
import { AuthorDetailFields } from '../../authors-management/author-info-edit/autho-info.form';

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
        author: of()
      }
    }
  };
  
  data: IAuthor = {
    name: 'H'
  };
  
  authors: IAuthor[] = [];
  publishers: any[] = [];

  constructor(
    private modalService: NgbModal,
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
    console.log(this.data)
    console.log(this.form.invalid)
  }

  close() { this.modal.close() }
}
