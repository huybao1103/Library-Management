import { SessionService } from 'src/app/services/session.service';
import { Injectable } from '@angular/core';
import { IBook } from 'src/app/models/book.model';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { IBookCart } from 'src/app/models/cart.model';
import { IAccountInfo } from 'src/app/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class BookCartService {
  bookCart: IBookCart[] = [];
  currentAccount: IAccountInfo | undefined;

  constructor(
    private sessionService: SessionService
  ) {
    this.getCartFromLocalStorage();
  }

  getCartFromLocalStorage() {
    this.currentAccount = this.sessionService.getCurrentAccount();

    const cart = localStorage.getItem(`cart_${this.currentAccount?.id}`);
    if(cart) {
      return this.bookCart = JSON.parse(cart);
    }
  }

  updateLocalStorage() {
    const cartJson = JSON.stringify(this.bookCart);

    localStorage.setItem(`cart_${this.currentAccount?.id}`, cartJson);
  }

  addToCart(bookChapter: IBookCart) {
    this.bookCart = [bookChapter, ...this.bookCart];

    this.updateLocalStorage();
  }

  removeItemInCart(bookChapter: IBookCart) {
    this.bookCart = this.bookCart.filter(cart => cart.bookChapterId !== bookChapter.bookChapterId);

    this.updateLocalStorage();
  }
}

