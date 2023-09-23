import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { IPublisher } from 'src/app/models/publisher.model';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { BookDetailFields } from '../../books-management/book-info-edit/book-info-form';
import { HttpService } from 'src/app/services/http-service.service';
import { PublisherDetailFields } from './publisher-info.form';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { PublisherService } from '../service/publisher.service';
import { map, tap } from 'rxjs';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-publisher-info-edit',
  templateUrl: './publisher-info-edit.component.html',
  styleUrls: ['./publisher-info-edit.component.css']
})
export class PublisherInfoEditComponent implements IDialogType, OnInit {
  uniqueId: string = uniqueId('publisher-info');
  title: string = '';

  fields: FormlyFieldConfig[] = []; // abcxyz
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {

      }
    }
  };

  data: IPublisher = {
    name: '',
  }

  product: IPublisher[] = [
    {
      name: 'Kim Đồng',
      mail: 'cskh_online@nxbkimdong.com.vn',
      phone: '01900571595',
      address: '55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội'
    },

  ];

  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private httpService: HttpService,
    private toastSerivce: ToastService,
    private publisherSerive: PublisherService,
    private confirmDialogService: ConfirmDialogService
  ) {
  }

  dialogInit(para: { id: string }): void {
    this.title = "Add Publisher";
    if (para.id) {
      this.title = "Edit Publisher Information";
      this.getPublisherById(para.id);
    } else {
      this.fields = PublisherDetailFields();
    }
  }

  ngOnInit(): void {

  }

  getPublisherById(id: string) {
    this.publisherSerive.getPublisherById(id).subscribe({
      next: (res) => {
        if (res)
          this.data = res;

        this.fields = PublisherDetailFields();
      }
    })
  }

  submit() {

    this.addPublisherConfirmed();
  }



  close() { this.modal.close() }

  private addPublisherConfirmed() {
    this.publisherSerive.save(this.data).subscribe({
      next: (resp) => {
        console.log(resp);
        this.toastService.show(MessageType.success, 'Publisher info save success');

        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    })
  }
}

