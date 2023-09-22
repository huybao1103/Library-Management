import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { ListboxModule } from 'primeng/listbox';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { FormlyModule as AppFormlyModule } from '../formly/formly.module';
import { HeaderComponent } from '../header/header.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { AuthorInfoEditComponent } from './authors-management/author-info-edit/author-info-edit.component';
import { AuthorsManagementComponent } from './authors-management/authors-management.component';
import { BookInfoEditComponent } from './books-management/book-info-edit/book-info.edit.component';
import { BooksManagementComponent } from './books-management/books-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CategoryListComponent } from './books-management/category-list/category-list.component';
import { BookAuthorEditComponent } from './books-management/book-info-edit/book-author-edit/book-author-edit.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CategoryInfoEditComponent } from './books-management/category-list/category-info-edit/category-info-edit.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ConfirmDialogService } from '../services/confirm-dialog.service';


@NgModule({
  providers: [ConfirmationService, ConfirmDialogService],
  declarations: [
    MainPageComponent,
    HeaderComponent,
    BooksManagementComponent,
    DashboardComponent,
    BookInfoEditComponent,
    AuthorsManagementComponent,
    AuthorInfoEditComponent,
    SideBarComponent,
    CategoryListComponent,
    CategoryInfoEditComponent,
    BookAuthorEditComponent
  ],
  imports: [
    DialogModule,
    ToggleButtonModule,
    DockModule,
    DividerModule,
    CommonModule,
    FeatureRoutingModule,
    ToastModule,
    SidebarModule,
    ListboxModule,
    FormsModule,
    FormlyModule.forChild({}),
    AppFormlyModule,
    ReactiveFormsModule,
    RouterModule,
    TableModule,
    TabViewModule,
    ConfirmDialogModule,
    FileUploadModule,
    ToolbarModule,
    InputTextModule,
  ]
})
export class FeatureModule { }
