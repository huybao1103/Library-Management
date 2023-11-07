import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT, FORMLY_INPUT_PASSWORD, FORMLY_SELECT } from "src/app/formly/formly.config";

export function ResetPasswordFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            key: 'password',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Password',
              required: true,
              type: 'password',
              showIcon: true
            }
          },
          {
            className: 'col-12',
            key: 're_password',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Repeat Password',
              required: true,
              type: 'password',
              showIcon: true
            },
            expressionProperties: {
            }
          },
        ]
      }
    ]
  };