import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FieldType } from "@ngx-formly/core";
import { INPUT_TEXT_TYPE } from "src/app/enums/input-text.type";

@Component({
    selector: 'formly-field-input',
    template: `
      <input-text
        [formControl]="$any(formControl)"
        [formlyAttributes]="field"
        [required]="to['required'] || false"
        [label]="props.label"
        [tabindex]="to.tabindex"
        [type]="type"
        [updateOnBlur]="to['updateOnBlur']"
        [readonly]="props.readonly || false"
        [placeholder]="to.placeholder || ''"
        [keyFilter]="props['keyFilter']">
      </input-text>
    `,
})
export class FormlyFieldInput extends FieldType {
    require = true;
    get type(): INPUT_TEXT_TYPE {
        return this.props.type as INPUT_TEXT_TYPE || INPUT_TEXT_TYPE.TEXT;
    }
}