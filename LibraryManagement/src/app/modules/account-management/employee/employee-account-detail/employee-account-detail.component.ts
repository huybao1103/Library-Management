import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ICategory } from 'src/app/models/category.model';
import { IDialogType } from 'src/app/models/modal/dialog';

@Component({
  selector: 'app-employee-account-detail',
  templateUrl: './employee-account-detail.component.html',
  styleUrls: ['./employee-account-detail.component.css']
})
export class EmployeeAccountDetailComponent implements IDialogType {
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
    
    this.title = `${this.id ? "Edit" : "Add"} Employee`;
  }

  submit() {
    
  }

  close() {
    this.modal.close();
  }
}
