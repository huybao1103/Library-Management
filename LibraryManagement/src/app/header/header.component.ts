import { IBookCart } from 'src/app/models/cart.model';
import { BookCartService } from './../reader-modules/book-search/book-search/book-cart.service';
import { SessionService } from 'src/app/services/session.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpService } from '../services/http-service.service';
import { ISidebarItem } from '../models/sidebar-item.model';
import { IAuthor } from '../models/author.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageType } from '../enums/toast-message.enum';
import { ToastService } from '../services/toast.service';
import { ListboxClickEvent } from 'primeng/listbox';
import { Router } from '@angular/router';
import { IAccountInfo } from '../models/account.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    sidebarVisible: boolean = false;
    cities!: ISidebarItem[];

    bookCart: IBookCart[] = [];
    
    currentAccountPermission: IAccountInfo | undefined;
    remaining = 0;
    
    constructor(
        private httpService: HttpService,
        private toastService: ToastService,
        private router: Router,
        private sessionService: SessionService,
        private bookCartService: BookCartService
    ) {}

    ngOnInit() {
        this.getCurrentAccount();
    }

    getCurrentAccount() {
        this.currentAccountPermission = this.sessionService.getCurrentAccount();

        if(this.currentAccountPermission?.role.name === 'Reader') {
            this.getCart();
        }
    }

    getCart() {
        const bookCart = this.bookCartService.getCartFromLocalStorage();
        if(bookCart)
            this.bookCart = bookCart;
        this.remaining = this.bookCartService.getRemainingNumber();
    }
    
    sidebarToggle() {
        this.sidebarVisible = !this.sidebarVisible;
    }

    sidebarClick(event: ListboxClickEvent) {
        this.router.navigate([`${event.option.code}`]);
        this.sidebarToggle();
    }

    logout() {
        this.sessionService.clearSession();
        this.router.navigate(['login']);
    }

    removeFromCart(bookChapterId: string) {
        if(bookChapterId) {
            this.bookCartService.removeItemInCart(bookChapterId);
            this.getCart();
        }
    }

    request() {
        this.router.navigate([{ outlets: { modal: ['book-search', 'book-cart'] } }]);
    }
}
