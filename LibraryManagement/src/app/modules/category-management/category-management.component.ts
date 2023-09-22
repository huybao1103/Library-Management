import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category.model';
import { HttpService } from 'src/app/services/http-service.service';
import { Observable } from 'rxjs';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categoryData: ICategory[] = [];
  category$?: Observable<ICategory[] | null>;
  categoryById: ICategory[] | undefined;

  constructor(
    private httpService: HttpService,
    private route: Router,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.httpService.getAll<ICategory[]>({ controller: 'Categories' }).subscribe({
      next: (res) => {
         if(res != undefined)
          this.categoryData = res;
          console.log(this.categoryData);
      }
    })


    const id = 'ef923ad9-7bbe-411c-a46c-4ddc86285f1a';
    this.httpService.getById<ICategory[]>({controller: 'Categories'}, id).subscribe({
      next: (res) => {
         if(res != undefined)
          this.categoryById = res;
          console.log(this.categoryById);
      }
    })
  }

  edit(id?: string) {
    console.log('selected category id ' + id);
    this.route.navigate([{ outlets: { modal: ['category', 'edit', id] } }]);
  }

}
