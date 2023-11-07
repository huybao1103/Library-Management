import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT, FORMLY_INPUT_PASSWORD, FORMLY_SELECT } from "src/app/formly/formly.config";

export function ForgotPasswordFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            key: 'email',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Email',
              required: true,
            }
          },
        ]
      }
    ]
  };