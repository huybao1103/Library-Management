import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http-service.service';
import { SessionService } from 'src/app/services/session.service';
import { Injectable } from '@angular/core';
import { IBook } from 'src/app/models/book.model';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { IBookCart } from 'src/app/models/cart.model';
import { IAccountInfo } from 'src/app/models/account.model';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { first } from 'rxjs';
import { MessageType } from 'src/app/enums/toast-message.enum';

@Injectable({
  providedIn: 'root'
})
export class BookCartService {
  bookCart: IBookCart[] = [];
  currentAccount: IAccountInfo | undefined;
  libraryCardId: string = "";

  max: number = 3;
  remaining: number = 3;

  constructor(
    private sessionService: SessionService,
    private httpService: HttpService,
    private toastService: ToastService
  ) {
    this.getCartFromLocalStorage();
  }

  getCartFromLocalStorage() {
    this.currentAccount = this.sessionService.getCurrentAccount();
    if(this.currentAccount)
      this.getLibraryCardByAccountId();
    
    const cart = localStorage.getItem(`cart_${this.currentAccount?.id}`);
    if(cart) {
      this.bookCart = JSON.parse(cart);

      return this.checkCartItemStatus();
    }
    return []
  }

  checkCartItemStatus() {
    const ids = this.bookCart.map(i => i.bookChapterId);
    this.httpService.saveWithCustomURL<string[]>({ controller: 'BookChapters', url: 'BookChapters/check-remove-cart-item', data: ids })
    .pipe(first())
    .subscribe({
      next: resp => {
        if(resp?.length) {
          for(const id of resp) 
            this.bookCart = this.bookCart.filter(i => i.bookChapterId !== id);
          
          this.updateLocalStorage();
        }
      }
    })
    return this.bookCart;
  }

  getLibraryCardByAccountId() {
    const accountId = this.currentAccount?.id;
    this.httpService.getWithCustomURL<ILibraryCardInfo>(
      { 
        controller: 'LibraryCards', 
        url: `LibraryCards/get-by-account-id/${accountId}` 
      }
    )
    .pipe(first())
    .subscribe({
      next: resp => {
        if(resp?.id) 
          this.libraryCardId = resp.id
          this.getRemainingBook();
      }
    })
  }

  updateLocalStorage() {
    const cartJson = JSON.stringify(this.bookCart);

    localStorage.setItem(`cart_${this.currentAccount?.id}`, cartJson);
  }

  addToCart(bookChapter: IBookCart) {
    if ( !this.bookCart.find(cart => cart.bookChapterId === bookChapter.bookChapterId) ) {
      if ( this.bookCart.length + 1 <= this.remaining ) {
        this.bookCart = [{...bookChapter, libraryCardId: this.libraryCardId}, ...this.bookCart];
        this.updateLocalStorage();
        
        return true;
      }
      else {
        this.toastService.show(MessageType.error, 'You cannot borrow any more book.')
      }
    }
    else {
      this.toastService.show(MessageType.error, 'This book is already in request borrow list.!!!')
    }
    return false;
  }

  removeItemInCart(bookChapterId: string) {
    if(bookChapterId) {
      this.bookCart = this.bookCart.filter(cart => cart.bookChapterId !== bookChapterId);
  
      this.updateLocalStorage();
    }
  }

  getRemainingBook() {
    const cardId = this.libraryCardId;
    this.httpService.getWithCustomURL<number>({ controller: 'LibraryCards', url: `LibraryCards/get-remaining-book/${cardId}` })
    .pipe(first())
    .subscribe({
      next: resp => {
        if(resp)
          this.remaining = resp
      }
    })
  }

  getRemainingNumber() {
    return this.remaining - this.bookCart.length
  }
}

