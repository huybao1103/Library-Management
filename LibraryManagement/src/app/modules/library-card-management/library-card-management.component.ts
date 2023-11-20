import { LibraryCardStatus } from './../../enums/library-card-status';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { LibraryCardService } from './service/library-card.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { RoleModulePermission } from 'src/app/models/role-permission.model';
import { SessionService } from 'src/app/services/session.service';
import { ModuleEnum } from 'src/app/enums/module-enum';

@Component({
  selector: 'app-library-card-management',
  templateUrl: './library-card-management.component.html',
  styleUrls: ['./library-card-management.component.css']
})
export class LibraryCardManagementComponent {
  searchName = "";
  
  libraryCard$?: Observable<ILibraryCardInfo[] | null>;
  @ViewChild('dt') dt: Table | undefined;
  messageService: any;

  LibraryCardStatus = LibraryCardStatus;
  categoryById: ILibraryCardInfo[] | undefined;
  libarycardPermission: RoleModulePermission | undefined;
  libraryDetailPermission: RoleModulePermission | undefined;


  constructor(
    private httpService: HttpService,
    private route: Router,
    private libraryCardService: LibraryCardService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
    private router: Router,
    private sessionService : SessionService,
  ) {
  }
  ngOnInit(): void {
    if(!this.sessionService.getModulePermission(ModuleEnum.LibraryCardManagement)?.access)
        this.router.navigate([''])
    else {
      this.getPermission();
      this.getData();
    }
  }

  getPermission() {
    this.libarycardPermission = this.sessionService.getModulePermission(ModuleEnum.LibraryCardManagement);
    this.libraryDetailPermission = this.sessionService.getModulePermission(ModuleEnum.LibraryCardBorrowHistory);
  }


  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  getData() {
    ///api/Categories
    this.libraryCard$ = this.libraryCardService.getAll();
  }

  edit(id?: string) {
    this.route.navigate([{ outlets: { modal: ['library-card', 'edit', id] } }]);
  }

  deleteLibraryCard(libraryCard: ILibraryCardInfo) {
    const libraryCardId = libraryCard?.id; 
    if (libraryCardId !== undefined) {
      this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + libraryCard.name + '?')
        .subscribe((result) => {
          if (result) {
            this.libraryCardService.delete(libraryCardId).subscribe({
              next: () => {
                this.toastService.show(MessageType.success, 'Delete Library Card Successfully');
                this.getData();
              },
              error: (err: any) => {
                this.toastService.show(MessageType.error, 'Error deleting Library Card');
              },
            });
          }
        });
    } else {
      console.error('libraryCard id is undefined');
    }
  }
  // goToDetail(id: string) {
  //   this.router.navigate(['/library-card-detail', id]);
  // }

  libraryCardDeatil(id: string){
    if(this.libraryDetailPermission?.access && id)
      this.router.navigate([`/library-card-detail/${id}`]);
  }
}
