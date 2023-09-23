import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { IAuthor } from 'src/app/models/author.model';
import { HttpService } from 'src/app/services/http-service.service';
import { Table } from 'primeng/table'
import { AuthorService } from './service/author.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';

@Component({
  selector: 'app-authors-management',
  templateUrl: './authors-management.component.html',
  styleUrls: ['./authors-management.component.css']
})
export class AuthorsManagementComponent implements OnInit {
  searchName = "";
  authors!: IAuthor[];
  author!: IAuthor;
  authorData: IAuthor[] = [];
  author$?: Observable<IAuthor[] | null>;
  @ViewChild('dt') dt: Table | undefined;
  messageService: any;


  categoryById: IAuthor[] | undefined;

  constructor(
    private httpService: HttpService,
    private route: Router,
    private authorService: AuthorService,
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
    this.author$ = this.authorService.getAll();
  }

  edit(id?: string) {
    console.log('selected author id ' + id);
      this.route.navigate([{ outlets: { modal: ['author', 'edit', id] } }]);
  }

  deleteAuthor(author: IAuthor) {
    const authorId = author?.id; 
    if (authorId !== undefined) {
      this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + author.name + '?')
        .subscribe((result) => {
          if (result) {
            this.authorService.delete(authorId).subscribe({
              next: () => {
                this.authorData = this.authorData.filter((val) => val.id !== authorId);
                this.toastService.show(MessageType.success, 'Delete Author Successfully');
                this.getData();
              },
              error: (err: any) => {
                console.error('Error deleting author:', err);
                this.toastService.show(MessageType.error, 'Error deleting author');
              },
            });
          }
        });
    } else {
      console.error('author id is undefined');
    }
  }
}
