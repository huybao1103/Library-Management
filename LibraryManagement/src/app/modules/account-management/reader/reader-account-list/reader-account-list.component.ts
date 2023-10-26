import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-account-list',
  templateUrl: './reader-account-list.component.html',
  styleUrls: ['./reader-account-list.component.css']
})
export class ReaderAccountListComponent {
  constructor(
    private router: Router
  ) {}

  editItem(itemId: string) {
    this.router.navigate([{ outlets: { modal: ['reader-account-list', 'edit', itemId] } }]);
  }
}
