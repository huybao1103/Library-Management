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
import { BookChapterComponent } from './books-management/book-chapter/book-chapter.component';

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
        path: 'bookchapter',
        component: BookChapterComponent 
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
