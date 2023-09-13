import { Component } from "@angular/core";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";

@Component({
    selector: 'formly-field-select',
    template: `
    <ng-select-item
      [formControl]="formControl"
      [formlyAttributes]="field"
      [multiple]="props['multiple']"
      [required]="props['required'] || false"
      [tabindex]="props.tabindex"
      [options]="props['options']"
      [clearable]="props['clearable']"
      [searchable]="props['searchable']"
      [readonly]="props.readonly || false"
      [panelStyleClass]="props['panelStyleClass']"
      >
    </ng-select-item>`
  })
  export class FormlyFieldNgSelect extends FieldType<FieldTypeConfig> {}