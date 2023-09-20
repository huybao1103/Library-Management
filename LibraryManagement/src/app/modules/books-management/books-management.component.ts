import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './service/book.service';
import { IBook } from 'src/app/models/book.model';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {
  books: IBook[] = [];
  image: string = '';

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private bookService: BookService,
    private confirmDialog: ConfirmDialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.bookService.getAll().subscribe({
      next: (res) => {
        if(res?.length) {
          this.books = res;

          this.books.map(b => b.authorName = b.bookAuthors?.map(ba => ba.author.name).join(', '))
        }
      }
    })
  }
  
  editItem(item: string) {
    this.router.navigate([{ outlets: { modal: ['book', 'edit', item] } }]);
  }

  deleteItem(item: string ) {
    this.confirmDialog.showConfirmDialog(
      'Are you sure you want to delete this item ?',
      'This action cannot be revert'
    ).subscribe({
      next: (confirmed) => {
        if(confirmed) {
          this.bookService.delete(item).subscribe({
            next: (res) => {
              this.toastService.show(MessageType.success, 'This book is deleted successfully')
            },
            error: (err: HttpErrorResponse) => {
              this.toastService.show(MessageType.error, err.error?.detail || 'Delete error')
            }
          })
        }
      }
    })
    
  }

  addBook() {
    
  }
}
