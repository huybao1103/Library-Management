import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ConfirmationService, FilterService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { FormlyModule as AppFormlyModule } from '../formly/formly.module';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { AuthorInfoEditComponent } from './authors-management/author-info-edit/author-info-edit.component';
import { AuthorsManagementComponent } from './authors-management/authors-management.component';
import { BookAuthorEditComponent } from './books-management/book-info-edit/book-author-edit/book-author-edit.component';
import { BookInfoEditComponent } from './books-management/book-info-edit/book-info.edit.component';
import { BookPublisherEditComponent } from './books-management/book-info-edit/book-publisher-edit/book-publisher-edit.component';
import { BooksManagementComponent } from './books-management/books-management.component';
import { CategoryInfoEditComponent } from './books-management/category-list/category-info-edit/category-info-edit.component';
import { CategoryListComponent } from './books-management/category-list/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { LibraryCardDetailComponent } from './library-card-management/library-card-detail/library-card-detail.component';
import { LibraryCardEditComponent } from './library-card-management/library-card-edit/library-card-edit.component';
import { LibraryCardManagementComponent } from './library-card-management/library-card-management.component';
import { PublisherInfoEditComponent } from './publishers-management/publisher-info-edit/publisher-info-edit.component';
import { PublishersManagementComponent } from './publishers-management/publishers-management.component';

import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService } from 'primeng/dynamicdialog';
import { DatatimePickerModule } from '../formly/form/datetime-picker/datatime-picker.module';
import { NgSelectItemModule } from '../formly/form/ng-select/ng-select.module';
import { BookSearchComponent } from '../reader-modules/book-search/book-search/book-search.component';
import { EmployeeAccountDetailComponent } from './account-management/employee/employee-account-detail/employee-account-detail.component';
import { EmployeeAccountListComponent } from './account-management/employee/employee-account-list/employee-account-list.component';
import { ReaderAccountDetailComponent } from './account-management/reader/reader-account-detail/reader-account-detail.component';
import { ReaderAccountListComponent } from './account-management/reader/reader-account-list/reader-account-list.component';
import { BookChapterInfoEditComponent } from './books-management/book-chapter/book-chapter-info-edit/book-chapter-info-edit.component';
import { BookChapterComponent } from './books-management/book-chapter/book-chapter.component';
import { NewHistoryRecordComponent } from './library-card-management/new-history-record/new-history-record.component';
import { RolePermissionComponent } from './role-permission/role-permission/role-permission.component';

@NgModule({
  providers: [
    ConfirmationService, 
    ConfirmDialogService,
    FilterService,
    NgbActiveModal,
    DialogService
  ],
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
    BookAuthorEditComponent,
    PublishersManagementComponent,
    PublisherInfoEditComponent,
    BookPublisherEditComponent,
    LibraryCardManagementComponent,
    LibraryCardEditComponent,
    LibraryCardDetailComponent,
    BookChapterComponent,
    BookChapterInfoEditComponent,
    NewHistoryRecordComponent,
    ReaderAccountListComponent,
    EmployeeAccountListComponent,
    ReaderAccountDetailComponent,
    EmployeeAccountDetailComponent,
    RolePermissionComponent,
    BookSearchComponent
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
    GalleriaModule,
    AvatarModule,
    NgbModule,
    TooltipModule,
    DatePipe,
    DatatimePickerModule,
    CalendarModule,
    NgSelectItemModule,
    MultiSelectModule,
    CheckboxModule,
  ]
})
export class FeatureModule { }
