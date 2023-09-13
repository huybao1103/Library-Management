import { Component, HostBinding, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { uniqueId } from 'lodash';
import { Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'ng-select-item',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgSelectComponent),
    multi: true
  }]
})
export class NgSelectComponent implements ControlValueAccessor {
  @HostBinding('class.form-control-host') defaultClass = true;
  uniqueId = uniqueId('ng-select-');
  @Input()
  defaultValue!: string;
  @Input()
  searchable!: boolean;
  @Input()
  labelProp!: string;
  @Input()
  label!: string;
  @Input()
  valueProp!: string;
  @Input()
  hideSelected!: boolean;
  @Input()
  multiple!: boolean;
  @Input()
  required: boolean = false;
  @Input()
  clearable!: boolean;
  @Input()
  placeholder!: string;
  @Input()
  minTermLength!: number;
  @Input()
  maxSelectedItems!: number;
  @Input() loading: boolean = false;
  @Input()
  typeToSearchText!: string;
  @Input()
  typeahead!: Subject<any>;
  @Input()
  itemLength!: number;
  @Input() readonly: boolean = false;
  @Input() options?: any[] | Observable<any[]>;
  @Input() disabled: boolean = true;
  @Input() panelStyleClass: string = '';
  value: any;

  onChange?: (_: any) => void;

  onTouched!: (fn: any) => void;

  constructor() { }

  get datas$(): Observable<any[] | undefined> {
    return !(this.options instanceof Observable) ? of(this.options) : this.options;
  }

  writeValue(value: any): void {
    console.log(this.options)
    this.value = value;
    if (this.onChange && value && value !== value) {
      this.onChange(value);
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

  labelValue(item: any): string {
    return item[this.labelProp || 'label'];
  }

  selectedChange(item: any) {
    let value;
    if (Array.isArray(item)) {
      value = item.map(x => x.value);
    } else {
      value = item[this.valueProp || "value"];
    }
    if (this.onChange && this.onTouched) {
      this.onChange(value);
      this.onTouched(value);
    }
  }
}
