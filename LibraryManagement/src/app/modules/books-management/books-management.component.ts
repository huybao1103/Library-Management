import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './service/book.service';
import { IBook } from 'src/app/models/book.model';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {
  books: IBook[] = [];

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.bookService.getAll().subscribe({
      next: (res) => {
        if(res?.length)
          this.books = res;
      }
    })
  }
  
  editItem(item: string) {
    this.router.navigate([{ outlets: { modal: ['book', 'edit', item] } }]);
  }

  addBook() {
    
  }
}
