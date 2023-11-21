import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryCardService } from '../service/library-card.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, first, map } from 'rxjs';
import { Router } from '@angular/router';
import { LibraryCardStatus } from 'src/app/enums/library-card-status';
import { Table } from 'primeng/table';
import { IBorrowHistoryInfo, IEditRecordInfo } from 'src/app/models/borrow-history.model';
import { BorrowHistoryStatus } from 'src/app/enums/borrow-history-status';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { error } from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { FilterMatchMode } from 'primeng/api';
import { RoleModulePermission } from 'src/app/models/role-permission.model';
import { SessionService } from 'src/app/services/session.service';
import { ModuleEnum } from 'src/app/enums/module-enum';

@Component({
  selector: 'app-library-card-detail',
  templateUrl: './library-card-detail.component.html',
  styleUrls: ['./library-card-detail.component.css']
})
export class LibraryCardDetailComponent implements OnInit{
  @ViewChild('dt') dt: Table | undefined;

  form = new FormGroup({
    datepicker: new FormControl()
  });

  options = [
    { label: BorrowHistoryStatus[BorrowHistoryStatus.Active], value: BorrowHistoryStatus.Active },
    { label: BorrowHistoryStatus[BorrowHistoryStatus.Inactive], value: BorrowHistoryStatus.Inactive },
    { label: BorrowHistoryStatus[BorrowHistoryStatus.Expired], value: BorrowHistoryStatus.Expired },
    { label: BorrowHistoryStatus[BorrowHistoryStatus.Returned], value: BorrowHistoryStatus.Returned },
    { label: BorrowHistoryStatus[BorrowHistoryStatus.Destroyed], value: BorrowHistoryStatus.Destroyed },
    { label: BorrowHistoryStatus[BorrowHistoryStatus.Lost], value: BorrowHistoryStatus.Lost },
    { label: BorrowHistoryStatus[BorrowHistoryStatus.WaitingForTake], value: BorrowHistoryStatus.WaitingForTake },
  ]

  id: string = '';
  libraryCard$?: Observable<ILibraryCardInfo | null>;

  histories:  IBorrowHistoryInfo[] = [];
  currentRecord: IBorrowHistoryInfo | undefined;

  data: ILibraryCardInfo = {
    name: '',
    class: '',
    expiryDate: '',
    status: LibraryCardStatus.Active,
    description: '',
    studentId: ''
  }

  currentImange: string = '';

  BorrowHistoryStatus = BorrowHistoryStatus;
  LibraryCardStatus = LibraryCardStatus
  
  statuses: BorrowHistoryStatus[] = [];
  borrowDateSort: Date | undefined;
  endDateSort: Date | undefined;
  libarycardDetailPermission: RoleModulePermission | undefined;

  isStudent = false;

  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private toastSerivce: ToastService,
    private libraryCardService: LibraryCardService,
    private confirmDialogService: ConfirmDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService : SessionService,
  ) {
  }

  ngOnInit(): void {
    if(this.sessionService.getCurrentAccount()?.role.name !== 'Reader' && !this.sessionService.getModulePermission(ModuleEnum.LibraryCardBorrowHistory)?.access)
        this.router.navigate(['library-card'])
    else {
      this.getPermission();
      this.id = this.route.snapshot.paramMap.get('id') ?? '';
      if (this.id) {
        if(this.id === 'reader') {
          this.isStudent = true;
          const currentAccountId = this.sessionService.getCurrentAccount()?.id;
          if(currentAccountId) 
            this.id = currentAccountId;
  
          this.getLibraryCardByAccountId(this.id);
        }
        else 
          this.getLibraryCardById(this.id);  
      }
    }
  }

  getPermission() {
    this.libarycardDetailPermission = this.sessionService.getModulePermission(ModuleEnum.LibraryCardBorrowHistory);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  dateFilter($event: any, field: string) {
    const date = new Date($event);

    this.dt?.filter(date.toISOString().substring(0, 10), field, FilterMatchMode.CONTAINS);
  }

  getLibraryCardByAccountId(id: string) {
    this.libraryCard$ = this.libraryCardService.getLibraryCardByAccountId(id);
    this.libraryCard$.subscribe({
      next: (res) => {
        if(res?.borrowHistories?.length) {
          this.histories = res?.borrowHistories
          
        }
      }
    })
  }

  getLibraryCardById(id: string) {
    this.libraryCard$ = this.libraryCardService.getLibraryCardById(id);
    this.libraryCard$.subscribe({
      next: (res) => {
        if(res?.borrowHistories?.length) {
          this.histories = res?.borrowHistories
          
        }
      }
    })
  }
  
  onRowEditInit(record: IBorrowHistoryInfo) {
    this.currentRecord = {...record};
  }

  onRowEditSave(record: IBorrowHistoryInfo) {
    console.log(record)
    delete this.currentRecord;

    const editRecord = {
      id: record.id,
      borrowDate: record.borrowDate,
      endDate: record.endDate,
      status: record.status,
      bookChapterId: record.bookChapterId,
      libraryCardId: record.libraryCardId
    } as IEditRecordInfo;

    this.libraryCardService.editRecord(editRecord)
    .subscribe({
      next: (resp => {
        this.toastSerivce.show(MessageType.success, "Record information saved successfully");

        if( editRecord.status === BorrowHistoryStatus.Lost || editRecord.status === BorrowHistoryStatus.Destroyed )
          this.libraryCard$ = this.libraryCard$?.pipe(
            map(x => {
              if(x)
                x.status = LibraryCardStatus.Inactive
              return x
            })
          )
      }),
      error: (err: HttpErrorResponse) => {
        this.toastSerivce.show(MessageType.error, err.error?.detail);
      }
    })
  }

  onRowEditCancel(record: IBorrowHistoryInfo, index: number) {
    if(this.currentRecord) {
      this.histories[index] = this.currentRecord;
      delete this.currentRecord;
    }

  }

  edit(status: LibraryCardStatus) {
    if(status === LibraryCardStatus.Inactive || status === LibraryCardStatus.Expired)
      this.toastSerivce.show(MessageType.error, "This library card is inactivated or expired, please change the status to active first.")
    else
      this.router.navigate([{ outlets: { modal: ['library-card-detail', 'new-record', this.id] } }]);
  }

  editLibraryCard() {
    this.router.navigate([{ outlets: { modal: ['library-card', 'edit', this.id] } }]);
  }

  deleteBorrowHistory(borrowhistory: IEditRecordInfo) {
    
  }
}
