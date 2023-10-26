import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-account-list',
  templateUrl: './employee-account-list.component.html',
  styleUrls: ['./employee-account-list.component.css']
})
export class EmployeeAccountListComponent {
  constructor(
    private router: Router
  ) {}

  editItem(itemId: string) {
    this.router.navigate([{ outlets: { modal: ['employee-account-list', 'edit', itemId] } }]);
  }
}
