import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DatetimePickerComponent } from './datetime-picker.component';



@NgModule({
  declarations: [
    DatetimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  exports: [
    DatetimePickerComponent
  ]
})
export class DatatimePickerModule { }
