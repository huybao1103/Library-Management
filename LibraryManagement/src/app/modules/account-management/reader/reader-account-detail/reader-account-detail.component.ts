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
import { Observable, first } from 'rxjs';
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

  options: FormlyFormOptions = {
    formState: {
      optionList: {
        librayCardList: null
      },
      isEditting: false
    }
  };

  data: IReaderAccount = {
    email: '',
    password: '',
    libraryCardId: ''
  }  

  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private readerAccountService: ReaderService,
    private confirmDialogService: ConfirmDialogService
  ) {
  }

  dialogInit(para: { id: string }): void {
    this.title = "Add Account";
    if (para.id) {
      this.title = "Edit Account Information";

      this.options.formState.isEditting = true;
      this.options.formState.optionList.librayCardList = this.readerAccountService.getLibraryCardOption();

      this.getReaderCardById(para.id);
    } else {
      this.options.formState.optionList.librayCardList = this.readerAccountService.getNewLibraryCardOption();
      this.fields = AccountDetailFields();
    }
  }

  ngOnInit(): void {
  }

  getReaderCardById(id: string) {
    this.readerAccountService.getReaderAccountById(id).pipe(first())
    .subscribe({
      next: resp => {
        if(resp) {
          this.data = resp;
          this.fields = AccountDetailFields();
        }
      }
    });
  }

  submit() {
    this.readerAccountService.save(this.data).subscribe({
      next: (resp: any) => {
        this.toastService.show(MessageType.success, 'Reader Account save success');
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })
  }

  close() { this.modal.close() }

  private addReaderAccountConfirmed() {
    this.readerAccountService.save(this.data).subscribe({
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

