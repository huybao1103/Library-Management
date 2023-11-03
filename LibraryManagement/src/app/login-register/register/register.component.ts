import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoginRegisterService } from '../service/login-register-service.service';
import { IRegisterModel } from 'src/app/models/register.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    id: new FormControl('', Validators.required),
    clazz: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    repeatPassword: new FormControl('', [Validators.minLength(8), Validators.required])
  })
  constructor(private loginRegisterService: LoginRegisterService) {
    this.loginRegisterService = loginRegisterService;
  }
  onSubmit = (): void => {
    if (this.registerForm.valid) {
      let email = this.registerForm.get('email')?.value;
      let password = this.registerForm.get('password')?.value;
      let id = this.registerForm.get('id')?.value;
      let clazz = this.registerForm.get('clazz')?.value;

      if (email && password && id && clazz) {
        const data: IRegisterModel = {
          email,
          password,
          ID: id,
          clazz
        }
        this.loginRegisterService.save(data);
      }
    }
  }
}
