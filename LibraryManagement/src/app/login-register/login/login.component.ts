import { Component } from '@angular/core';
import { LoginRegisterService } from '../service/login-register-service.service';
import { iAccount } from 'src/app/models/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isStudentSelected: boolean = true;
  isLoginBlockVisible: boolean = true;

  onRoleChange(event: any) {
    if (event.target.value === 'LIBRARIAN') {
      this.isStudentSelected = false;
      this.isLoginBlockVisible = false;
    } else {
      this.isStudentSelected = true;
      this.isLoginBlockVisible = true;
    }
  }

  constructor(private loginRegisterService: LoginRegisterService) { }

  login(email: string, password: string) {
    this.loginRegisterService.login(email, password).subscribe(
      (response: iAccount) => {
        // Xử lý phản hồi từ API khi đăng nhập thành công
        console.log(response);

        // Lưu token hoặc thực hiện các thao tác cần thiết
        //
      },
      (error) => {
        // Xử lý lỗi khi đăng nhập không thành công
        console.error(error);
        alert('Đăng nhập không thành công. Vui lòng thử lại.');
      }
    );
  }

  email: string = '';
  password: string = '';
}

