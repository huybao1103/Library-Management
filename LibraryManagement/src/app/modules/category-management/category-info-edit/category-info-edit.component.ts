import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { of } from 'rxjs';
import { IAuthor } from 'src/app/models/author.model';
import { IBook, IBookSave } from 'src/app/models/book.model';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { AuthorDetailFields } from '../../authors-management/author-info-edit/autho-info.form';
import { AuthorInfoEditComponent } from '../../authors-management/author-info-edit/author-info-edit.component';
import { BookDetailFields } from '../../books-management/book-info-edit/book-info-form';
import { BookService } from '../../books-management/service/book.service';
import { ICategory, ICategorySave } from 'src/app/models/category.model';
import { CategoryService } from '../service/category.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryDetailFields } from './category-info-form';

@Component({
  selector: 'app-category-info-edit',
  templateUrl: './category-info-edit.component.html',
  styleUrls: ['./category-info-edit.component.css']
})
export class CategoryInfoEditComponent implements IDialogType ,OnInit{
  uniqueId: string = uniqueId('category-info');
  title: string = '';

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        categories: of(),
        books: this.categoryService.getBookOption()
      }
    }
  };
  
  data: ICategory = {
    name: '',
    description: '',
  };

  books: IBook[] = [];

  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private categoryService: CategoryService
  ) {
    this.fields = CategoryDetailFields();
  }
  ngOnInit(): void {
    
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Category";
    if (para.id) {
      this.title = "Edit Category Information";
    }
  }

  addAccount() {
    const modalRef = this.modalService.open(CategoryInfoEditComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static'
    })

    modalRef.componentInstance.fields = BookDetailFields();
    modalRef.componentInstance.addBookToCategory = true;
    modalRef.result.then((res) => this.books.push(res));
  }

  submit() {
    if(this.data) {
      var categoryModel: ICategorySave = this.data;
      categoryModel = {
        ...categoryModel,
        bookCategory: this.books.map(a => a.id ? a.id : '')
      }
      this.categoryService.save(categoryModel).subscribe({
        next: (res) => {
          this._toastService.show(MessageType.success, 'Add Category successfully');
        },
        error: (err: HttpErrorResponse) => {
          this._toastService.show(MessageType.error, err.error?.detail);
        }
      })
    }
  }

  close() { this.modal.close() }
}

