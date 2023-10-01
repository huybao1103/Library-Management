import { Component, OnInit } from '@angular/core';
import { LibraryCardService } from '../service/library-card.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILibraryCardInfo } from 'src/app/models/library-card.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-card-detail',
  templateUrl: './library-card-detail.component.html',
  styleUrls: ['./library-card-detail.component.css']
})
export class LibraryCardDetailComponent implements OnInit{
  libraryCard$?: Observable<ILibraryCardInfo[] | null>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getLibraryCardById(id);  
    }
    this.getData();
  }
  getData() {
    ///api/Categories
    this.libraryCard$ = this.libraryCardService.getAll();
  } 
  data: ILibraryCardInfo = {
    id: '',
    name: '',
    class: '',
    expiryDate: '',
    description: '',
    studentId: ''
  }

  currentImange: string = '';

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
  getLibraryCardById(id: string) {
    this.libraryCardService.getLibraryCardById(id).subscribe({
      next: (res) => {
        if(res)
          this.data = res;
          if(this.data.studentImages?.length)
            this.currentImange = this.data.studentImages[0].base64;
      }
    })
  }
    edit(id?: string) {
    this.router.navigate([{ outlets: { modal: ['library-card', 'edit', id] } }]);
  }
}
