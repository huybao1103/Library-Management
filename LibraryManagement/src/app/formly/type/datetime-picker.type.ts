import { Component, Input } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
    selector: 'formly-field-datetime',
    template: `
      <datetime-picker
        [formControl]="$any(formControl)"
        [formlyAttributes]="field"
        [label]="props.label || ''"
        [required]="props['required'] || false"
        [tabindex]="props.tabindex"
        [view]="props['view']"
        [dateFormat]="props['dateFormat']"
        [minDate]="props['minDate']"
        [maxDate]="props['maxDate']"
        [defaultDate]="props['defaultDate']"
        [showTime]="props['showTime']"
        [showIcon]="props['showIcon'] || false"
        [showButtonBar]="props['showButtonBar'] || false"
        ></datetime-picker>
    `
})
export class FormlyFieldDateTime extends FieldType {
}