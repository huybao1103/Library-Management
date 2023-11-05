import { PublisherService } from './../../../publishers-management/service/publisher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Table } from 'primeng/table';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { first, of, pipe } from 'rxjs';
import { IDialogType } from 'src/app/models/modal/dialog';
import { AuthorDetailFields } from 'src/app/modules/authors-management/author-info-edit/author-info.form';
import { AuthorService } from 'src/app/modules/authors-management/service/author.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { BookService } from '../../service/book.service';
import { IPublisher } from 'src/app/models/publisher.model';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { PublisherDetailFields } from 'src/app/modules/publishers-management/publisher-info-edit/publisher-info.form';

@Component({
  selector: 'app-book-publisher-edit',
  templateUrl: './book-publisher-edit.component.html',
  styleUrls: ['./book-publisher-edit.component.css']
})
export class BookPublisherEditComponent  implements IDialogType, OnInit {
  @ViewChild('dt1') dt?: Table;

  allPublishers: IPublisher[] = [];
  selectedPublishers: IPublisher[] = [];
  newPublisher: IPublisher = {
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
    private publisherService: PublisherService,
    private confirmDialogService: ConfirmDialogService
  ) {}


  dialogInit(para: any, routeConfig?: Route | undefined): void {
  }
  
  ngOnInit(): void {
    this.getAuthors();
    this.fields = PublisherDetailFields();
  }

  getAuthors() {
    this.publisherService.getAll()
    .pipe(first())
    .subscribe({
      next: (resp) => {
        if(resp)
          this.allPublishers = resp;
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
      'New Publisher will be added to system and will be referenced to this book, do you want to continue ?',
      'Add Publisher to new Book confirmation'
    ).subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.publisherService.save(this.newPublisher).subscribe({
            next: (resp) => {
              if(resp) {
                this.allPublishers = [resp, ...this.allPublishers];
                this.selectedPublishers = [...this.selectedPublishers, resp];
              }
              this.toastService.show(MessageType.success, 'Publisher info save success');

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

  savePublisher() {
    this.modal.close(this.selectedPublishers);
  }

  close() {
    this.modal.close();
  }
}
