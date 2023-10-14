import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryCardService } from '../service/library-card.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LibraryCardStatus } from 'src/app/enums/library-card-status';
import { Table } from 'primeng/table';
import { IBorrowHistoryInfo } from 'src/app/models/borrow-history.model';

@Component({
  selector: 'app-library-card-detail',
  templateUrl: './library-card-detail.component.html',
  styleUrls: ['./library-card-detail.component.css']
})
export class LibraryCardDetailComponent implements OnInit{
  @ViewChild('dt') dt: Table | undefined;

  
  id: string = '';
  libraryCard$?: Observable<ILibraryCardInfo | null>;

  histories:  IBorrowHistoryInfo[] = [];

  data: ILibraryCardInfo = {
    name: '',
    class: '',
    expiryDate: '',
    status: LibraryCardStatus.Active,
    description: '',
    studentId: ''
  }

  currentImange: string = '';

  LibraryCardStatus = LibraryCardStatus;
  
  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private toastSerivce: ToastService,
    private libraryCardService: LibraryCardService,
    private confirmDialogService: ConfirmDialogService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      this.getLibraryCardById(this.id);  
    }
    // this.getData();
  }
  // getData() {
  //   ///api/Categories
  //   this.libraryCard$ = this.libraryCardService.getLibraryCardById(this.id);
  // } 

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getLibraryCardById(id: string) {
    this.libraryCard$ = this.libraryCardService.getLibraryCardById(id);
    this.libraryCard$.subscribe({
      next: (res) => {
        if(res?.borrowHistories?.length)
        this.histories = res?.borrowHistories
      }
    })
  }
  
  edit() {
    this.router.navigate([{ outlets: { modal: ['library-card-detail', 'new-record', this.id] } }]);
  }
}
