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
  options: FormlyFormOptions = {
    formState: {
      optionList: {
      
      }
    }
  };

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
    private accountService: AccountService,
  ) {
  }

  dialogInit(para: { id: string }): void {
    this.title = "Add Account";
    if (para.id) {
      this.title = "Edit Account Information";
      this.getAccountById(para.id);
      console.log(para.id);
    } else {
      this.fields = AccountDetailFields();
    }
  }

  ngOnInit(): void {

  }

  getAccountById(id: string) {
    this.accountService.getAccountById(id).subscribe({
      next: (res: IReaderAccount) => {
        if (res)
          this.data = res;
          this.fields = AccountDetailFields();
      }
    })
  }

  loadData(id: string) {
    this.accountService.getPublisherById(id).subscribe({
      next: (res: IReaderAccount) => {
        if(res)
          this.data = res;
        this.fields = AccountDetailFields();
      } 
    })
  }

  submit() {
    this.accountService.save(this.data).subscribe({
      next: (resp: any) => {
        this.toastService.show(MessageType.success, 'Account info save success');
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })
  }



  close() { this.modal.close() }

  private addPublisherConfirmed() {
    this.accountService.save(this.data).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.toastService.show(MessageType.success, 'Account info save success');

        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })
  }
}