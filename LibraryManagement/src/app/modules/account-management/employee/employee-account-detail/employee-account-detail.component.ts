import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './../service/employee-service.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { MessageType } from '@microsoft/signalr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ICategory } from 'src/app/models/category.model';
import { IEmployee } from 'src/app/models/employee-account';
import { IDialogType } from 'src/app/models/modal/dialog';
import { EmployeeAccountField } from './employee-account-form';
import { HttpService } from 'src/app/services/http-service.service';
import { ToastService } from 'src/app/services/toast.service';

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
  
  data: IEmployee = {
    name: '',
    phone: '',
    citizenId: '',
    birthDate: '',
    joinDate: '',
    accountId: '',
    passWord: '',
    email: '',
  };
  constructor(
    private modal: NgbActiveModal,
    private toastService: ToastService,
    private employeeService: EmployeeService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.fields = EmployeeAccountField();
  }

  dialogInit(para: { id: string }): void {
    this.title = 'Add Employee';
    if (para.id) {
      this.title = 'Edit Employee Information';
      this.getEmployeeById(para.id);
    }
  }

  getEmployeeById(id: string) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res) => {
        if (res) {
          this.data = res;
        }
      }
    });
  }

  submit() {
    this.employeeService.saveEmployee(this.data).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.toastService.show(MessageType.success, 'Employee info saved successfully');

        // Depending on your use case, you may want to close the modal here or do something else.
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(MessageType.error, err.error?.detail);
      }
    });
  }

  close() {
    this.modal.close();
  }
}
