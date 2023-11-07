import { HttpErrorResponse } from '@angular/common/http';
import { LoginRegisterService } from './../service/login-register-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { first } from 'rxjs';
import { ResetPasswordFields } from './reset-password.form';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
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
    password: '',
    re_password: ''
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
    
    this.fields = ResetPasswordFields();
  }

  resetPassword() {
    if(this.data.password !== this.data.re_password) {
      this.error = 'Password and Repeat Password is different.';
      return;
    }

    this.loginRegisterService.resetPassword({ ...this.data, accountId: this.accountId })
    .pipe(first())
    .subscribe({
      next: res => {
        if(res)
          this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error?.detail
      }
    })
  }
}
