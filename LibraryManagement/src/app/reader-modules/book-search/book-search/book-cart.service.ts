import { Injectable } from '@angular/core';
import { IBook } from 'src/app/models/book.model';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { IBookCart } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class BookCartService {
  bookCart: IBookCart[] = [];

  constructor() { }

  addToCart(bookChapter: IBookCart) {
    this.bookCart = [bookChapter, ...this.bookCart];
  }
}
