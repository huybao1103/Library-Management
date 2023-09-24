import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from './service/category.service';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table'
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})

export class CategoryListComponent implements OnInit{
  searchName = "";
  categories!: ICategory[];
  category!: ICategory;
  categoryData: ICategory[] = [];
  category$?: Observable<ICategory[] | null>;
  selectedCategories!: ICategory[] | null;
  @ViewChild('dt') dt: Table | undefined;
  messageService: any;


  categoryById: ICategory[] | undefined;

  constructor(
    private httpService: HttpService,
    private route: Router,
    private categoryService: CategoryService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
  ) {
  }
  ngOnInit(): void {
    this.getData();
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  getData() {
    ///api/Categories
    this.category$ = this.categoryService.getAll();
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

  deleteCategory(category: ICategory) {
    const categoryId = category?.id; 
    if (categoryId) {
      this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + category.name + '?')
        .subscribe((result) => {
          if (result) {
            this.categoryService.delete(categoryId).subscribe({
              next: () => {
                this.categoryData = this.categoryData.filter((val) => val.id !== categoryId);
                this.toastService.show(MessageType.success, 'Delete Sategory Successfully');
                this.getData();
              },
              error: (err: any) => {
                console.error('Error deleting category:', err);
                this.toastService.show(MessageType.error, 'Error deleting category');
              },
            });
          }
        });
    } else {
      console.error('category.id is undefined');
    }
  }
  
}