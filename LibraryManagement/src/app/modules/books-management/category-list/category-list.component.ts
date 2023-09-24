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
  
  category$?: Observable<ICategory[] | null>;

  selectedCategories!: ICategory[] | null;
  @ViewChild('dt') dt: Table | undefined;

  constructor(
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
    this.category$ = this.categoryService.getAll();
  }

  edit(id?: string) {
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
                this.toastService.show(MessageType.success, 'Delete Sategory Successfully');
                this.getData();
              },
              error: (err: any) => {
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