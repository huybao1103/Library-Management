import { Component } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
    selector: 'formly-field-check-box',
    template: `
      <check-box
        [label]="props.label || ''"
        [defaultValue]="props['defaultValue']"
        [required]="props['required'] || false"
        [formControl]="$any(formControl)"
        [formlyAttributes]="field">
      </check-box>
  `,
})
export class FormlyFieldCheckbox extends FieldType {
}