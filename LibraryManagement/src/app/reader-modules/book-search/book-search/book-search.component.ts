import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FilterService, MessageService, FilterMatchMode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ModuleEnum } from 'src/app/enums/module-enum';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { IBook, IBookSave } from 'src/app/models/book.model';
import { IComboboxOption } from 'src/app/models/combobox-option.model';
import { RoleModulePermission } from 'src/app/models/role-permission.model';
import { AuthorService } from 'src/app/modules/authors-management/service/author.service';
import { BookSearchFields } from 'src/app/modules/books-management/book-search-field';
import { BookService } from 'src/app/modules/books-management/service/book.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  books: IBook[] = [];
  booksDisplay: IBook[] = [];
  image: string = '';
  categories: IComboboxOption[] = [];
  allCategories: IComboboxOption[] = [];
  selectedCategory: string = "";

  categorySearchName: string = "All";

  books$?: Observable<IBook[] | null>;

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        authors: this.authorService.getAuthorOption(),
        categories: this.bookService.getCategoriesOption()
      }
    }
  };
  
  data: IBookSave = {
    name: '',
    publishYear: '',
  };
  
  //*
  perrmission: RoleModulePermission | undefined;
  bookDetailPermission: RoleModulePermission | undefined;

  constructor(
    private router: Router,
    private sessionService : SessionService,
    private bookService: BookService,
    private confirmDialog: ConfirmDialogService,
    private toastService: ToastService,
    private filterServive: FilterService,
    private authorService: AuthorService,
    public dialogService: DialogService,
    public messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.getCagories();
  }

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  loadData() {
    this.books$ = this.bookService.getAll(this.selectedCategory);
    this.fields = BookSearchFields();
  }

  getCagories() {
    this.bookService.getCategoriesOption().subscribe({
      next: (res) => {
        if(res) {
          this.categories = [...this.allCategories] = [{ value: '', label: 'All' }, ...res];
        }
      }
    })
  }

  categoryChange(categoryId: string) {
    if(categoryId === 'all') {
      this.selectedCategory = '';
      this.loadData();
    } else if(categoryId !== this.selectedCategory) {
      this.selectedCategory = categoryId;
      this.loadData();
    }
  }

  categorySearch(text: string) {
    this.categories = [...this.allCategories];
    if(text) {
      this.categorySearchName = text.trim();

      this.categories = this.allCategories.filter(cate => {
        return this.filterServive.filters[FilterMatchMode.CONTAINS](cate.label, this.categorySearchName) ? cate : ''
      });
    }
  }

  search() {
    this.books$ = this.bookService.search(this.data);
  }

  //*
  bookChapter(bookId: string) {
  }
}
