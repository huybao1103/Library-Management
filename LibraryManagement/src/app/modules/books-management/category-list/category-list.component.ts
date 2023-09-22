import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { AuthorService } from '../../authors-management/service/author.service';
import { TableModule } from 'primeng/table';
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

  constructor(
    private httpService: HttpService,
    private route: Router,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private confirmDialogService: ConfirmDialogService
    
  ) {
  }
  ngOnInit(): void {
    this.getData();
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
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

    // this.categoryService.getAll().subscribe({
    //   next: (res) => {
    //     if(res?.length)
    //       this.categoryData = res;
    //       console.log(this.categoryData);
    //   }
    // })

    this.category$ = this.categoryService.getAll();

  }

  edit(id?: string) {
    console.log('selected category id ' + id);
    this.route.navigate([{ outlets: { modal: ['category', 'edit', id] } }]);
  }
  // deleteCategory(id?: string) {
  //   console.log('selected category id ' + id);
  //   this.route.navigate([{ outlets: { modal: ['category', 'delete', id] } }]);
  //   this.categoryService.delete;
  // }
  // deleteCategory(category: ICategory) {
  //   const categoryId = category?.id; 
  //   if (categoryId !== undefined) {
  //     this.confirmationService
  //       .showConfirmDialog('Are you sure you want to delete ' + category.name + '?')
  //       .subscribe((result) => {
  //         if (result) {
  //           this.categoryService.delete(categoryId).subscribe({
  //             next: () => {
  //               this.categoryData = this.categoryData.filter((val) => val.id !== categoryId);
  //               this.messageService.add({
  //                 severity: 'success',
  //                 summary: 'Successful',
  //                 detail: 'Category Deleted',
  //                 life: 3000,
  //               });
  //             },
  //             error: (err: any) => {
  //               console.error('Error deleting category:', err);
  //             },
  //           });
  //         }
  //       });
  //   } else {
  //     console.error('category.id is undefined');
  //   }
  // }

  click() {
    this.confirmDialogService
      .showConfirmDialog('Are you sure you want to proceed?')
      .subscribe({
        next: (confirm) => {
          if(confirm){
            
          }
        }
      })
  }

  deleteCategory(category: ICategory) {
    const categoryId = category?.id; 
    if (categoryId !== undefined) {
      this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + category.name + '?')
        .subscribe((result) => {
          if (result) {
            this.categoryService.delete(categoryId).subscribe({
              next: () => {
                this.categoryData = this.categoryData.filter((val) => val.id !== categoryId);
                this.toastService.show(MessageType.success, 'Delete Sategory Successfully');
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