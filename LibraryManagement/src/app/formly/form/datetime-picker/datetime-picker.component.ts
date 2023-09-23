import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { uniqueId } from 'lodash';
import { CalendarTypeView } from 'primeng/calendar';
import { environment } from 'src/app/environment';

@Component({
  selector: 'datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerComponent),
      multi: true,
    },
  ],
})
export class DatetimePickerComponent implements ControlValueAccessor {
  @HostBinding('class.form-control-host') defaultClass = true;
  uniqueId = uniqueId('date-time-');
  disabled = false;
  value: any;
  datepickerFormat: string;
  @Input() label: string = "";
  @Input() required: boolean = false;
  @Input() showWeekNumbers: boolean = false;
  @Input() view?: CalendarTypeView;
  @Input() dateFormat: string;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() defaultDate: Date = new Date();
  @Input() showTime: boolean = false;
  @Input() showIcon: boolean = false;
  @Input() showButtonBar: boolean = false;

  onChange?: (_: any) => void;

  onTouched!: (fn: any) => void;

  constructor() {
    this.dateFormat = environment.dateFormat;
    this.datepickerFormat = environment.datepickerFormat;
  }

  writeValue(newVal: any): void {
    if (typeof newVal === 'string') {
      this.value = new Date(newVal);
    } else {
      this.value = newVal;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChanged(event: Date) {
    let value: Date | string = event;
    if (event) {
      value = event.toISOString();
      if (!this.showTime) {
        const month = ('0' + (event.getMonth() + 1)).slice(-2);
        const day = ('0' + event.getDate()).slice(-2);
        value = `${event.getFullYear()}-${month}-${day}T00:00:00.000Z`;
      }
    }
    this.value = event;

    if (this.onChange) {
      this.onChange(value);
    }

    if (this.onTouched) {
      this.onTouched(value);
    }
  }
}