import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import { IPublisher } from 'src/app/models/publisher.model';
import { PublisherService } from './service/publisher.service';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table'
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { RoleModulePermission } from 'src/app/models/role-permission.model';
import { SessionService } from 'src/app/services/session.service';
import { ModuleEnum } from 'src/app/enums/module-enum';

@Component({
  selector: 'app-publishers-management',
  templateUrl: './publishers-management.component.html',
  styleUrls: ['./publishers-management.component.css']
})

export class PublishersManagementComponent implements OnInit{
  publisher$?: Observable<IPublisher[] | null>;
  selectedPublishers!: IPublisher[] | null;
  
  @ViewChild('dt') dt: Table | undefined;
  publisherPermission: RoleModulePermission | undefined;

  constructor(
    private route: Router,
    private publisherService: PublisherService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
    private sessionService : SessionService,
    ) {
  }

  ngOnInit(): void {
    if(!this.sessionService.getModulePermission(ModuleEnum.PublisherManagement)?.access)
        this.route.navigate([''])
    else {
      this.getPermission();
      this.getData();
    }
  }

  getPermission() {
    this.publisherPermission = this.sessionService.getModulePermission(ModuleEnum.PublisherManagement);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getData() {
    this.publisher$ = this.publisherService.getAll();
  }

  edit(id?: string) {
    this.route.navigate([{ outlets: { modal: ['publisher', 'edit', id] } }]);
  }

  deletePublisher(publisher: IPublisher) {
    const publisherId = publisher?.id; 

    if (publisherId !== undefined) {
      this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + publisher.name + '?')
        .subscribe((result) => {
          if (result) {
            this.publisherService.delete(publisherId).subscribe({
              next: () => {
                this.toastService.show(MessageType.success, 'Delete Publisher Successfully');
                this.getData();
              },
              error: (err: any) => {
                this.toastService.show(MessageType.error, 'Error deleting publisher');
              },
            });
          }
        });
    } else {
      console.error('publisher.id is undefined');
    }
  }
}
