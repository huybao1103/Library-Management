import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
  }
  
  editItem(item: string) {
    this.router.navigate([{ outlets: { modal: ['book', 'edit', item] } }]);
  }
}
