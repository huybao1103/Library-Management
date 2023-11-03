import { Component } from "@angular/core";
import { FieldType } from "@ngx-formly/core";

@Component({
    selector: 'formly-field-input-password',
    template: `
      <input-password
        [formControl]="$any(formControl)"
        [formlyAttributes]="field"
        [required]="to['required'] || false"
        [label]="props.label"
        [tabindex]="to.tabindex"
        [updateOnBlur]="to['updateOnBlur']"
        [readonly]="props.readonly || false"
        [placeholder]="to.placeholder || ''">
      </input-password>
    `,
})
export class FormlyFieldInputPassword extends FieldType {
}