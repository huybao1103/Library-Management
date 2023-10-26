import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IDialogType } from 'src/app/models/modal/dialog';

@Component({
  selector: 'app-reader-account-detail',
  templateUrl: './reader-account-detail.component.html',
  styleUrls: ['./reader-account-detail.component.css']
})
export class ReaderAccountDetailComponent implements IDialogType {
  uniqueId: string = '';
  width?: string | undefined;
  height?: string | undefined;
  size?: 'sm' | 'lg' | 'xl' | undefined;

  title: string = "";
  id: string = "";
  
  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
         
      }
    }
  };
  
  data: any; // Tạo model mới rồi sửa lại kiểu dữ liệu

  constructor(
    private modal: NgbActiveModal,
  ) {

  }

  dialogInit(para: any, routeConfig?: Route | undefined): void {
    this.id = para.id;
    
    this.title = `${this.id ? "Edit" : "Add"} Account`;
  }

  submit() {
    
  }

  close() {
    this.modal.close();
  }
}