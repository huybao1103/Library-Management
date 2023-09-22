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
  categoryById: ICategory | undefined;

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
    // /api/Categories
    // this.categoryService.getAll().subscribe({
    //   next: (resp) => {
    //     if(resp)
    //       this.categoryData = resp;

    //     console.log(this.categoryById);
    //   }
    // })

    // this.category$ = this.categoryService.getAll();
    // const id = '173265c1-05d1-4c24-a686-c3c866b27a1a';
    // this.httpService.getById<ICategory[]>({controller: 'Categories'},id).subscribe({
    //   next: (resp) => {
    //     if(resp)//check có dữ liệu hay không
    //     {
    //       this.categoryData = resp;
    //       console.log(this.categoryById)
    //     }
    //   }
    // });

    this.categoryService.getAll().subscribe({
      next: (res) => {
        if(res?.length)
          this.categoryData = res;
          console.log(this.categoryData);
      }
    })
  }

  edit(id?: string) {
    console.log('selected category id ' + id);
    this.route.navigate([{ outlets: { modal: ['category', 'edit', id] } }]);
  }

}
