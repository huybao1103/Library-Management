import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { uniqueId } from 'lodash';

@Component({
  selector: 'check-box',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  uniqueId = uniqueId('check-box-');
  @Input() label: string = "";
  @Input() formControl!: FormControl<any>;
  @Input() required: boolean = false;
  @Input() defaultValue = false;
  disabled = false;
  value: boolean = false;

  onChange?: (_: any) => void;

  onTouched?: (fn: any) => void;

  writeValue(value: boolean): void {
    this.value = value;
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

  onModelChange() {
    if(this.onChange)
      this.onChange(this.value);
  }
}