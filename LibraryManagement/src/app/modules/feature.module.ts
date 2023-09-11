import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { BooksManagementComponent } from './books-management/books-management.component';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { BookInfoEditComponent } from './books-management/book-info-edit/book-info.edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyModule as AppFormlyModule } from '../formly/formly.module';
import { ModalbaseComponent } from '../layout/modalbase/modalbase.component';
import { RouterModule } from '@angular/router';
import { AuthorsManagementComponent } from './authors-management/authors-management.component';
import { AuthorInfoEditComponent } from './authors-management/author-info-edit/author-info-edit.component';

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    BooksManagementComponent,
    DashboardComponent,
    BookInfoEditComponent,
    AuthorsManagementComponent,
    AuthorInfoEditComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ToastModule,
    SidebarModule,
    ListboxModule,
    FormsModule,
    FormlyModule.forChild({}),
    AppFormlyModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class FeatureModule { }
