import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_CHECKBOX, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function ExampleDetailFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Book Name',
              required: true
            }
          },
          
        ]
      }
    ]
  };