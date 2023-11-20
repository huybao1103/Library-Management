import { LoginRegisterService } from './../service/login-register-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IAuthor } from 'src/app/models/author.model';
import { LoginFields } from './login.form';
import { first, pipe } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { MessageType } from 'src/app/enums/toast-message.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  error: string = '';

  constructor(
    private loginService: LoginRegisterService,
    private session: SessionService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fields = LoginFields();
  }

  login() {
    this.loginService.login(this.data)
    .pipe(first())
    .subscribe({
      next: (resp) => {
        if(resp) {
          this.session.updateSession(resp);
          this.router.navigate(['']);
          this.error = '';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Wrong email or password.'
      }
    })
  }
}
