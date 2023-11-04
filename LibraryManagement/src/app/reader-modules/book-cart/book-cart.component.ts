import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { IDialogType } from 'src/app/models/modal/dialog';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.css']
})
export class BookCartComponent implements IDialogType {
  uniqueId: string = '';
  width?: string | undefined;
  height?: string | undefined;
  size?: 'sm' | 'lg' | 'xl' | undefined;
  
  dialogInit(para: any, routeConfig?: Route | undefined): void {
    throw new Error('Method not implemented.');
  }

}
