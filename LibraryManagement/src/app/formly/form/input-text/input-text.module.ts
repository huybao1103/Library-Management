import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTextComponent } from './input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule as PrimengInput } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengInput,
    KeyFilterModule
  ],
  declarations: [InputTextComponent],
  exports: [InputTextComponent]
})
export class InputTextModule { 
}
