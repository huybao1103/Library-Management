import { Component, EventEmitter, HostBinding, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { uniqueId } from 'lodash';
import { INPUT_TEXT_TYPE } from 'src/app/enums/input-text.type';
import { KeyFilterType } from 'src/app/enums/p-key-filter.type';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextComponent),
    multi: true
  }]
})
export class InputTextComponent implements ControlValueAccessor {

  @HostBinding('class.form-control-host') defaultClass = true;
  uniqueId = uniqueId('input-text-');

  @Input() inline = false;
  @Input() label: string | undefined;
  @Input() required: boolean = false;
  @Input() optional = false;
  @Input() readonly = false;
  @Input() autocomplete = false;
  @Input() placeholder = '';
  @Input() testId!: string;
  @Input() maxlength!: number;
  @Input() minlength!: number;
  @Input() step!: number;
  @Input() min!: number;
  @Input() max!: number;
  @Input() type: INPUT_TEXT_TYPE = INPUT_TEXT_TYPE.TEXT;
  @Input() updateOnBlur = false;
  @Input() numberFormat!: string;
  @Input() calculated = false;
  @Input() showIcon = true;
  @Input() keyFilter: KeyFilterType = KeyFilterType.text_number

  @Output() keyup: EventEmitter<any> = new EventEmitter<any>();

  value: any = "";

  @Input() disabled = false;
  formCls: string = "";

  TEXT_FIELD_TYPE = INPUT_TEXT_TYPE;
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
