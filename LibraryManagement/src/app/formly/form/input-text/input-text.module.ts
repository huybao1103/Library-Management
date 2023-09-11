import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTextComponent } from './input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule as PrimengInput } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengInput
  ],
  declarations: [InputTextComponent],
  exports: [InputTextComponent]
})
export class InputTextModule { 
}
