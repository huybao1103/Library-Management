import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IDialogType } from 'src/app/models/modal/dialog';
import { IReaderAccount } from 'src/app/models/reader-account.model';
import { AccountDetailFields } from './reader-account.form';
import { HttpErrorResponse } from '@angular/common/http';
import { uniqueId } from 'lodash';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { ReaderService } from '../service/reader-service.service';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-reader-account-detail',
  templateUrl: './reader-account-detail.component.html',
  styleUrls: ['./reader-account-detail.component.css']
})
export class ReaderAccountDetailComponent implements IDialogType, OnInit {
  uniqueId: string = uniqueId('account-info');
  title: string = '';
  fields: FormlyFieldConfig[] = []; // abcxyz
  form = new FormGroup({});

  addReaderLibraryCard: boolean = false;

  options: FormlyFormOptions = {
    formState: {
      optionList: {
      
      }
    }
  };

  readerAccount$?: Observable<IReaderAccount | null>;

  data: IReaderAccount = {
    name: '',
    mail: '',
    pass: '',
    status: '',
    getAccountById: function (id: string): unknown {
      throw new Error('Function not implemented.');
    },
    save: function (data: IReaderAccount): unknown {
      throw new Error('Function not implemented.');
    }
  }  
  
   publisher: IReaderAccount[] = [];


  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private readeraccountService: ReaderService,
    private confirmDialogService: ConfirmDialogService
  ) {
  }

  dialogInit(para: { id: string }): void {
    this.title = "Add Account";
    if (para.id) {
      this.title = "Edit Account Information";
      // this.getAccountById(para.id);
      console.log(para.id);
    } else {
      this.fields = AccountDetailFields();
    }
  }

  ngOnInit(): void {

  }

  getReaderCardById(id: string) {
    this.readerAccount$ = this.readeraccountService.getReaderAccountById(id);
    this.readerAccount$.subscribe({
      next: (res) => {
        if(res) {
          this.data = res;
          this.fields = AccountDetailFields();
          
        }
      }
    })
  }

  // loadData(readerAccountId: string) {
  //   this.readeraccountService.getReaderAccountById(readerAccountId).subscribe({
  //     next: (res) => {
  //       if(res) {
  //         this.data = {
  //           ...res,
  //           // categories: res.bookCategories?.map(cate => cate.categoryId)
  //         };
        
  //         this.fields = AccountDetailFields();
  //       }
  //     }
  //   })
  // }

  


  submit() {
    this.readeraccountService.save(this.data).subscribe({
      next: (resp: any) => {
        this.toastService.show(MessageType.success, 'Reader Account save success');
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })
  }

  // submit() {
  //   this.addReaderLibraryCard 
  //   ? this.confirmDialogService.showConfirmDialog(
  //       'New Reader Account will be added to system and will be referenced to this book, do you want to continue ?',
  //       'Add Author to new Book confirmation'
  //     ).subscribe({
  //       next: (confirmed) => {
  //         if(confirmed) {
  //           this.addAuthorConfirmed();
  //         }
  //       }
  //     })
  //   : this.addAuthorConfirmed();
  // }



  close() { this.modal.close() }

  private addReaderAccountConfirmed() {
    this.readeraccountService.save(this.data).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.toastService.show(MessageType.success, 'Reader Account info save success');

        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })
  }
}