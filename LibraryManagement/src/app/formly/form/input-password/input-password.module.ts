import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputPasswordComponent } from './input-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InputPasswordComponent],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputPasswordComponent
  ]
})
export class InputPasswordModule { }
