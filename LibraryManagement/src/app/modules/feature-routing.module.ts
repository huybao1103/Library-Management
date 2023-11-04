import { RolePermissionComponent } from './role-permission/role-permission/role-permission.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { BooksManagementComponent } from './books-management/books-management.component';
import { ModalbaseComponent } from '../layout/modalbase/modalbase.component';
import { BookInfoEditComponent } from './books-management/book-info-edit/book-info.edit.component';
import { AuthorsManagementComponent } from './authors-management/authors-management.component';
import { AuthorInfoEditComponent } from './authors-management/author-info-edit/author-info-edit.component';
import { PublishersManagementComponent } from './publishers-management/publishers-management.component';
import { PublisherInfoEditComponent } from './publishers-management/publisher-info-edit/publisher-info-edit.component';
import { CategoryListComponent } from './books-management/category-list/category-list.component';
import { CategoryInfoEditComponent } from './books-management/category-list/category-info-edit/category-info-edit.component';
import { LibraryCardManagementComponent } from './library-card-management/library-card-management.component';
import { LibraryCardEditComponent } from './library-card-management/library-card-edit/library-card-edit.component';
import { LibraryCardDetailComponent } from './library-card-management/library-card-detail/library-card-detail.component';

import { BookChapterComponent } from './books-management/book-chapter/book-chapter.component';
import { BookChapterInfoEditComponent } from './books-management/book-chapter/book-chapter-info-edit/book-chapter-info-edit.component';
import { NewHistoryRecordComponent } from './library-card-management/new-history-record/new-history-record.component';
import { ReaderAccountDetailComponent } from './account-management/reader/reader-account-detail/reader-account-detail.component';
import { ReaderAccountListComponent } from './account-management/reader/reader-account-list/reader-account-list.component';
import { EmployeeAccountDetailComponent } from './account-management/employee/employee-account-detail/employee-account-detail.component';
import { EmployeeAccountListComponent } from './account-management/employee/employee-account-list/employee-account-list.component';
import { BookSearchComponent } from '../reader-modules/book-search/book-search/book-search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'book',
        component: BooksManagementComponent,
      },
      {
        path: 'book/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: BookInfoEditComponent }
      },
      {
        path: 'bookchapter/:id',
        component: BookChapterComponent 
      },
      {
        path: 'bookchapter/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: BookChapterInfoEditComponent}
      },
      {
        path: 'author',
        component: AuthorsManagementComponent
      },
      {
        path: 'author/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: AuthorInfoEditComponent }
      },
      {
        path: 'category',
        component: CategoryListComponent
      },
      {
        path: 'category/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: CategoryInfoEditComponent }
      },
      {
        path: 'publisher',
        component: PublishersManagementComponent
      },
      {
        path: 'publisher/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: PublisherInfoEditComponent }
      },
      {
        path: 'library-card',
        component: LibraryCardManagementComponent
      },
      {
        path: 'library-card/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: LibraryCardEditComponent }
      },
      {
        path: 'library-card-detail/:id',
        component: LibraryCardDetailComponent,
      },
      {
        path: 'library-card-detail/new-record/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: NewHistoryRecordComponent }
      },
      {
        path: 'reader-account-list',
        component: ReaderAccountListComponent,
      },
      {
        path: 'reader-account-list/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: ReaderAccountDetailComponent }
      },
      {
        path: 'employee-account-list',
        component: EmployeeAccountListComponent,
      },
      {
        path: 'employee-account-list/edit/:id',
        component: ModalbaseComponent,
        outlet: 'modal',
        data: { component: EmployeeAccountDetailComponent }
      },
      {
        path: 'role-permission',
        component: RolePermissionComponent,
      },
      {
        path: 'book-search',
        component: BookSearchComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
