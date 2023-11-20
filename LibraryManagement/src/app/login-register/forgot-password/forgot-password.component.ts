import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { first } from 'rxjs';
import { ResetPasswordFields } from '../reset-password/reset-password.form';
import { LoginRegisterService } from '../service/login-register-service.service';
import { ForgotPasswordFields } from './forgot-password.form';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  fields: FormlyFieldConfig[] = []; // abcxyz
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        // author: this.getBookOption()
      }
    }
  };

  data: any = {
    email: '',
    password: ''
  }

  error = '';
  accountId: string = '';
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginRegisterService: LoginRegisterService
  ) {}
  
  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId') ?? '';
    this.email = this.route.snapshot.paramMap.get('email') ?? '';
    
    this.fields = ForgotPasswordFields();
  }

  request() {
    this.loginRegisterService.sendResetPasswordMail(this.data)
    .pipe(first())
    .subscribe({
      next: res => {
        if(res)
          this.error = 'Please check your email to get the reset password link!!!'
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.detail
      }
    })
  }
}
