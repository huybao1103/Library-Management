import { LoginRegisterService } from './../service/login-register-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IAuthor } from 'src/app/models/author.model';
import { LoginFields } from './login.form';
import { first, pipe } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

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

  constructor(
    private loginService: LoginRegisterService,
    private session: SessionService,
    private router: Router
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
        }
      }
    })
  }
}
