import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { Observable, map, of } from 'rxjs';
import { IAuthor } from 'src/app/models/author.model';
import { IBook, IBookSave } from 'src/app/models/book.model';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { ICategory, ICategorySave } from 'src/app/models/category.model';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { CategorysDetailFields } from './category-info-form';
import { CategoryService } from '../service/category.service';
import { BookDetailFields } from '../../book-info-edit/book-info-form';
import { HttpService } from 'src/app/services/http-service.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { CategoryListComponent } from '../category-list.component';

@Component({
  selector: 'app-category-info-edit',
  templateUrl: './category-info-edit.component.html',
  styleUrls: ['./category-info-edit.component.css']
})
export class CategoryInfoEditComponent implements IDialogType ,OnInit{
  uniqueId: string = uniqueId('category-info');
  title: string = '';
  category$?: Observable<ICategory[] | null>;
  addCategory: boolean = false;


  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
         categories: this.getCategoryOption(),
      }
    }
  };
  
  data: ICategory = {
    name: '',
    description: '',
  };

  categorys: ICategory[] = [];

  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private categoryService: CategoryService,
    private httpService: HttpService,
    private confirmDialogService: ConfirmDialogService
  ) {
    

  }



  dialogInit(para: {id: string}): void {
    this.title = "Add Category";
    if (para.id) {
      this.title = "Edit Category Information";
      this.getCategoryById(para.id);
      console.log(para.id);
    }else {
      this.fields = CategorysDetailFields();
    }
    
  }

  ngOnInit(): void {

  }

  getCategoryById(id: string): void{
    this.httpService.getById<ICategory>({controller: 'Categories'}, id).subscribe({
      next: (res) => {
         if(res != undefined)
          this.data = res;

          console.log(this.data);
          this.fields = CategorysDetailFields();
      }
    })
  }

  loadData(id: string) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (res) => {
        if(res)
          this.data = res;
          console.log(this.data);
          console.log(this.data.id);
        this.fields = CategorysDetailFields();
      } 
    })
    
  }
  
  getCategoryOption() {
    return this.categoryService.getCategoryOption().pipe(map(res => res))
  }

  addAccount() {
    const modalRef = this.modalService.open(CategoryInfoEditComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static'
    })

    modalRef.componentInstance.fields = CategorysDetailFields();
    modalRef.componentInstance.addBookToCategory = true;
    modalRef.result.then((res) => this.categorys.push(res));
  }

  submit() {
    this.categoryService.save(this.data).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastService.show(MessageType.success, 'Category info save success');
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this._toastService.show(MessageType.error, err.error?.detail);
      }
    })
  }

  close() { this.modal.close() }
}

