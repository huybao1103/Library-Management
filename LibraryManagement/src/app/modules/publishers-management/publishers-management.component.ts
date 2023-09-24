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

@Component({
  selector: 'app-publishers-management',
  templateUrl: './publishers-management.component.html',
  styleUrls: ['./publishers-management.component.css']
})

export class PublishersManagementComponent implements OnInit{
  publisherData: IPublisher[] = [];
  publisher$?: Observable<IPublisher[] | null>;
  publisherById: IPublisher[] | undefined;
  publishers!: IPublisher[];
  publisher!: IPublisher;
  selectedPublishers!: IPublisher[] | null;
  
  @ViewChild('dt') dt: Table | undefined;
  messageService: any;

  constructor(
    private route: Router,
    private publisherService: PublisherService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,) {
  }

  ngOnInit(): void {
    this.getData();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getData() {
    this.publisher$ = this.publisherService.getAll();
    this.httpService.getAll<IPublisher[]>({ controller: 'Publishers' }).subscribe({
      next: (res) => {
         if(res != undefined)
          this.publisherData = res;
          console.log(this.publisherData);
      }
    })
  }

  edit(id?: string) {
    console.log('selected publisher id ' + id);
    this.route.navigate([{ outlets: { modal: ['publisher', 'edit', id] } }]);
  }

  deletePublisher(publisher: IPublisher) {
    const publisherId = publisher?.id; 
    if (publisherId !== undefined) {
      // this.confirmDialogService.showConfirmDialog('Are you sure you want to delete ' + category.name + '?')
      //   .subscribe((result) => {
      //     if (result) {
            this.publisherService.delete(publisherId).subscribe({
              next: () => {
                this.publisherData = this.publisherData.filter((val) => val.id !== publisherId);
                this.toastService.show(MessageType.success, 'Delete Publisher Successfully');
                this.getData();
              },
              error: (err: any) => {
                console.error('Error deleting publisher:', err);
                this.toastService.show(MessageType.error, 'Error deleting publisher');
              },
            });
        //   }
        // });
    } else {
      console.error('category.id is undefined');
    }
  }
 
}
