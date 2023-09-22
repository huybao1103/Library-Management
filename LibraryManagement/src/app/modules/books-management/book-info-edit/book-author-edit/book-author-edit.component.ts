import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { of } from 'rxjs';
import { IAuthor } from 'src/app/models/author.model';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { BookService } from '../../service/book.service';
import { AuthorDetailFields } from 'src/app/modules/authors-management/author-info-edit/autho-info.form';
import { Table } from 'primeng/table';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { AuthorService } from 'src/app/modules/authors-management/service/author.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageType } from 'src/app/enums/toast-message.enum';

@Component({
  selector: 'app-book-author-edit',
  templateUrl: './book-author-edit.component.html',
  styleUrls: ['./book-author-edit.component.css']
})
export class BookAuthorEditComponent implements IDialogType, OnInit {
  @ViewChild('dt1') dt?: Table;

  allAuthors: IAuthor[] = [];
  existingAuthors: IAuthor[] = [];
  selectedAuthors: IAuthor[] = [];
  newAuthor: IAuthor = {
    name: '',
  }
  
  uniqueId: string = '';
  checked: boolean = true;

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
  
  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private bookService: BookService,
    private authorService: AuthorService,
    private confirmDialogService: ConfirmDialogService
  ) {}


  dialogInit(para: any, routeConfig?: Route | undefined): void {
  }
  
  ngOnInit(): void {
    this.getAuthors();
    this.fields = AuthorDetailFields();
  }

  getAuthors() {
    this.authorService.getAll().subscribe({
      next: (resp) => {
        if(resp)
          this.allAuthors = resp;
      }
    })
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  toggle(event: ToggleButtonChangeEvent) {
    this.checked ? this.modal.update({size: 'xl'}) : this.modal.update({size: 'lg'})
  }

  clear(table: Table) {
    table.clear();
  }

  submit() {
    this.confirmDialogService.showConfirmDialog(
      'New Author will be added to system and will be referenced to this book, do you want to continue ?',
      'Add Author to new Book confirmation'
    ).subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.authorService.save(this.newAuthor).subscribe({
            next: (resp) => {
              if(resp) {
                this.allAuthors = [...this.allAuthors, resp];
                this.selectedAuthors = [...this.selectedAuthors, resp];
              }
              this.toastService.show(MessageType.success, 'Author info save success');

              this.form.reset();
            },
            error: (err: HttpErrorResponse) => {
              this.toastService.show(MessageType.error, err.error?.detail);
            }
          })    
        }
      }
    })
  }

  saveAuthor() {
    this.modal.close(this.selectedAuthors);
  }

  resetForm() {
    this.newAuthor = {
      name: '',

    }
  }

  close() {
    this.modal.close();
  }
}
