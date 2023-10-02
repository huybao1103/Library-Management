import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { BookChapterService } from './service/book-chapter.service';
import { Observable, first } from 'rxjs';
import { Table } from 'primeng/table'
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { BookService } from '../service/book.service';
import { IBook } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-chapter',
  templateUrl: './book-chapter.component.html',
  styleUrls: ['./book-chapter.component.css']
})
export class BookChapterComponent implements OnInit {
  book$?: Observable<IBook | null>;
  selectedBookChapters!: IBookChapter[] | null;
  book: IBook | undefined;

  bookId: any;
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private route: Router,
    private bookChapterService: BookChapterService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
    ) {}

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBook();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getBook() {
    this.book$ = this.bookService.getBookById(this.bookId);
  }

  getData() {
    // this.bookchapter$ = this.bookChapterService.getAll(this.bookId);
  }

  edit(id?: string) {
    this.route.navigate([{ outlets: { modal: ['bookchapter', 'edit', id] } }]);
  }

  deleteBookChapter(bookchapter: IBookChapter) {
    const bookchapterId = bookchapter?.id; 

    if (bookchapterId !== undefined) {
      this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + bookchapter.chapter + '?')
        .subscribe((result) => {
          if (result) {
            this.bookChapterService.delete(bookchapterId).subscribe({
              next: () => {
                this.toastService.show(MessageType.success, 'Delete BookChapter Successfully');
                this.getData();
              },
              error: (err: any) => {
                this.toastService.show(MessageType.error, 'Error deleting BookChapter');
              },
            });
          }
        });
    } else {
      console.error('book.id is undefined');
    }
  }
}
