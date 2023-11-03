import { Component, EventEmitter, HostBinding, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { uniqueId } from 'lodash';

@Component({
  selector: 'input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPasswordComponent),
    multi: true
  }]
})
export class InputPasswordComponent implements ControlValueAccessor {
  @HostBinding('class.form-control-host') defaultClass = true;
  uniqueId = uniqueId('input-password-');
  @Input() inline = false;
  @Input() label: string | undefined;
  @Input() required: boolean = false;
  @Input() optional = false;
  @Input() readonly = false;
  @Input() autocomplete = false;
  @Input() placeholder = '';
  @Input() updateOnBlur = false;
  @Input() step!: number;
  @Input() min!: number;
  @Input() max!: number;
  @Input() maxlength!: number;
  @Input() minlength!: number;

  @Output() keyup: EventEmitter<any> = new EventEmitter<any>();

  value: any = "";

  @Input() disabled = false;
  formCls: string = "";

  onChange?: (value: string) => void

  onTouched?: (fn: any) => void;

  touched($event:any) {
    if (this.onTouched) {
      this.onTouched($event);
    }
  }

  onKeyUp($event: KeyboardEvent) {
    this.keyup.emit($event);
    if (this.onTouched) {
      this.onTouched($event);
    }

    if (!this.updateOnBlur && this.onChange && this.value) {
      this.onChange(this.value.trim());
    }
  }

  change() {
    if(this.onChange) {
      this.value = this.value.trim();
      this.formCls = this.required && !this.value ? "ng-invalid" : "";

      this.onChange(this.value.trim());
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
