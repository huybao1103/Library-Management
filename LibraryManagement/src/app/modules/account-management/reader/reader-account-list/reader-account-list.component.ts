import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first } from 'rxjs';
import { IReaderAccount } from 'src/app/models/reader-account.model';
import { HttpService } from 'src/app/services/http-service.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';
import { ReaderService } from '../service/reader-service.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { BookSearchFields } from 'src/app/modules/books-management/book-search-field';
import { AccountDetailFields } from '../reader-account-detail/reader-account.form';
import { HttpErrorResponse } from '@angular/common/http';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';

@Component({
  selector: 'app-reader-account-list',
  templateUrl: './reader-account-list.component.html',
  styleUrls: ['./reader-account-list.component.css']
})
export class ReaderAccountListComponent implements OnInit {
  selectedLibraryCard: string = "";

  searchQuery: string = '';

  readerAccount: ILibraryCardInfo[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastService: ToastService,
    private sessionService : SessionService,
    private renderaccountService: ReaderService,
    private confirmDialogService: ConfirmDialogService,
    ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.renderaccountService.getAll(this.selectedLibraryCard)
    .pipe(first())
    .subscribe({
      next: resp => {
        if(resp)
          this.readerAccount = resp;
      }
    });
  }

  edit(id: string) {
    this.router.navigate([{ outlets: { modal: ['reader-account-list', 'edit', id] } }]);
  }

  deleteReaderAccount(accountId: string) {
    this.confirmDialogService.showConfirmDialog(
      'Are you sure you want to delete this item ?',
      'This action cannot be revert'
    ).subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.renderaccountService.delete(accountId).subscribe({
            next: (res) => {
              this.toastService.show(MessageType.success, 'This reader account is deleted successfully')
            },
            error: (err: HttpErrorResponse) => {
              this.toastService.show(MessageType.error, err.error?.detail || 'Delete error')
            }
          })
        }
      }
    })
  }
}
