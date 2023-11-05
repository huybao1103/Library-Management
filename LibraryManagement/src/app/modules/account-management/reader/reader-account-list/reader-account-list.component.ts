import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IReaderAccount, IReaderAccountSave } from 'src/app/models/reader-account.model';
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

@Component({
  selector: 'app-reader-account-list',
  templateUrl: './reader-account-list.component.html',
  styleUrls: ['./reader-account-list.component.css']
})
export class ReaderAccountListComponent implements OnInit {
  readerAccount: IReaderAccount[] = [];
  selectedLibraryCard: string = "";
  libraryCard: IComboboxOption[] = [];
  allLibraryCard: IComboboxOption[] = [];

  readerAccount$?: Observable<IReaderAccount[] | null>;


  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        libraryCard: this.renderaccountService.getLibraryCardOption()
      }
    }
  };


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
    this.getLibraryCard();
  }
  searchQuery: string = '';


  data: IReaderAccountSave = {
    name: '',
    mail: '',
    pass: '',
    status: '',
    getAccountById: function (id: string): unknown {
      throw new Error('Function not implemented.');
    },
    save: function (data: IReaderAccountSave): unknown {
      throw new Error('Function not implemented.');
    }
  }  

  

  readerAccounts: any[] = [
    {
      id: 1,
      name: 'John Doe',
      cardId: '12345',
      email: 'abc@gmail.com',
      status: 'Active',
      cardImages: [
        {
          base64: 'image_base64_data'
        }
      ]
    },
    {
      id: 1,
      name: 'John Doe',
      cardId: '12345',
      email: 'abc@gmail.com',
      status: 'Deactivated',
      cardImages: [
        {
          base64: 'image_base64_data'
        }
      ]
    },
    // Add more dummy data here
  ];

  // getData() {
  //   ///api/Categories
  //   this.readerAccount$ = this.renderaccountService.getAll();
  // }

  getLibraryCard() {
    this.renderaccountService.getLibraryCardOption().subscribe({
      next: (res) => {
        if(res) {
          this.libraryCard = [...this.allLibraryCard] = [{ value: '', label: 'All' }, ...res];
        }
      }
    })
  }

  loadData() {
    this.readerAccount$ = this.renderaccountService.getAll(this.selectedLibraryCard);
    this.fields = AccountDetailFields();
  }

  edit(cardId: string) {
    this.router.navigate([{ outlets: { modal: ['reader-account-list', 'edit', cardId] } }]);
  }

  // deleteReaderAccount(card: any) {
  //   // Find the index of the reader account in the array
  //   const index = this.readerAccounts.findIndex(account => account.id === card.id);

  //   if (index !== -1) {
  //     // Perform delete logic here, such as removing the reader account from the array
  //     this.readerAccounts.splice(index, 1);
  //   }
  // }

  deleteReaderAccount(item: string) {
    this.confirmDialogService.showConfirmDialog(
      'Are you sure you want to delete this item ?',
      'This action cannot be revert'
    ).subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.renderaccountService.delete(item).subscribe({
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

  search() {
    // Perform search logic here, such as filtering the readerAccounts array based on the searchQuery
    // For example, you can filter by name or cardId
    const filteredAccounts = this.readerAccounts.filter(account =>
      account.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      account.cardId.includes(this.searchQuery)
    );

    // Update the readerAccounts array with the filtered results
    // Alternatively, you can store the filtered results in a separate variable for display
    this.readerAccounts = filteredAccounts;
  }
}
