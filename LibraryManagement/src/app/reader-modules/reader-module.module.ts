import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSearchComponent } from './book-search/book-search/book-search.component';
import { ReaderMainPageComponent } from './reader-main-page/reader-main-page.component';
import { ReaderHeaderComponent } from './reader-header/reader-header.component';
import { ReaderRoutingModule } from './reader-module-routing';
import { RouterModule } from '@angular/router';
import { BookCartComponent } from './book-cart/book-cart.component';



@NgModule({
  declarations: [
    // BookSearchComponent,
    ReaderMainPageComponent,
    ReaderHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReaderRoutingModule,
    RouterModule
  ]
})
export class ReaderModule { }
