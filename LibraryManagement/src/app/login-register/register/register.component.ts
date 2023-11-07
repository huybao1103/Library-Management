import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoginRegisterService } from '../service/login-register-service.service';
import { IRegisterModel } from 'src/app/models/register.model';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { RegisterFields } from './register.form';
import { first } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fields: FormlyFieldConfig[] = []; // abcxyz
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        // author: this.getBookOption()
      }
    }
  };
  
  error: string = '';

  constructor(
    private registerService: LoginRegisterService,
    private toastService: ToastService,
    private router: Router
  ) {}

  data: any = {
    password: '',
    re_password: ''
  }

  
  ngOnInit(): void {
    this.fields = RegisterFields();
  }

  register() {
    if(this.data.password !== this.data.re_password) {
      this.error = 'Password and Repeat Password is different.';
      return;
    }
    this.registerService.register(this.data)
    .pipe(first())
    .subscribe({
      next: resp => {
        if(resp) {
          this.toastService.show(MessageType.success, 'Registered Successfully.')
          this.router.navigate(['/login'])
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.detail;
      }
    })
  }
}
