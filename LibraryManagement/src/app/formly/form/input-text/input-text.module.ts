import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTextComponent } from './input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule as PrimengInput } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengInput,
    KeyFilterModule,
    InputNumberModule
  ],
  declarations: [InputTextComponent],
  exports: [InputTextComponent]
})
export class InputTextModule { 
}
