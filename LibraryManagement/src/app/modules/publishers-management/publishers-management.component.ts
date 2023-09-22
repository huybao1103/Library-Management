import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPublisher } from 'src/app/models/publisher.model';
import { HttpService } from 'src/app/services/http-service.service';
import { PublisherService } from './service/publisher.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publishers-management',
  templateUrl: './publishers-management.component.html',
  styleUrls: ['./publishers-management.component.css']
})
export class PublishersManagementComponent implements OnInit{
  publisherData: IPublisher[] = [];
  publisher$?: Observable<IPublisher[] | null>;

  constructor(
    private httpService: HttpService,
    private route: Router,
    private publisherService: PublisherService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    
    this.publisher$ = this.publisherService.getAll();
  }

  edit(id?: string) {
    console.log('selected publisher id ' + id);
    this.route.navigate([{ outlets: { modal: ['publisher', 'edit', id] } }]);
  }
}
