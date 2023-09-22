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
import { map, tap } from 'rxjs';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { HttpService } from 'src/app/services/http-service.service';
import { CategorysDetailFields } from '../../books-management/category-list/category-info-edit/category-info-form';

@Component({
  selector: 'app-category-info-edit',
  templateUrl: './category-info-edit.component.html',
  styleUrls: ['./category-info-edit.component.css']
})
export class CategoryInfoEditComponent implements IDialogType ,OnInit{
  uniqueId: string = uniqueId('category-info');
  title: string = '';

  addCategory: boolean = false;

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        categories: of(),
        category: this.getCategoryOption(),
      }
    }
  };
  
  data: ICategory = {
    name: '',
    description: '',
  };

  category: ICategory[] = [];

  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private categoryService: CategoryService,
    private confirmDialogService: ConfirmDialogService,
    private httpService: HttpService,
  ) {
    this.fields = CategoryDetailFields();
  }
  ngOnInit(): void {
      // this.submit()
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Category";
    if (para.id) {
      this.title = "Edit Category Information";
      this.getCategoryById(para.id);
    } else {
      this.fields = CategoryDetailFields();
    }
  }

  getCategoryOption() {
    return this.categoryService.getCategoryOption().pipe(map(res => res))
  }

  
  getCategoryById(id: string) {
    this.httpService.getById<ICategory>({controller: 'Categories'}, id).subscribe({
      next: (res) => {
         if(res != undefined)
          this.data = res;

          console.log(this.data);
          this.fields = CategorysDetailFields();
      }
    })
  }


  addAccount() {
    const modalRef = this.modalService.open(CategoryInfoEditComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static'
    })

    modalRef.componentInstance.fields = BookDetailFields();
    modalRef.componentInstance.addAuthorToBook = true;
    modalRef.result.then((res) => this.category.push(res));
  }

  submit() {
    this.httpService.save({ controller: 'Categories', data: this.data}).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastService.show(MessageType.success, 'Category info save success');
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this._toastService.show(MessageType.error, err.error?.detail);
      }
    })
    console.log(this.data.id);
  }

  close() { this.modal.close() }

  private addCategoryConfirmed() {
    this.categoryService.save(this.data).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastService.show(MessageType.success, 'Category info save success');

        this._toastService ? this.modal.close(resp) : this.close();
      },
      error: (err: HttpErrorResponse) => {
        this._toastService.show(MessageType.error, err.error?.detail);
      }
    })    
  }
}

