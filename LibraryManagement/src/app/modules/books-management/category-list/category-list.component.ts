import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from './service/category.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  searchName = "";
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
    ///api/Categories
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
