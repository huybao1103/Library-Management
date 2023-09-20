import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT } from "src/app/formly/formly.config";

export function AuthorDetailFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Author Name',
              required: true
            }
          },
          {
            className: 'col-6',
            key: 'phone',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Author Phone',
            },
            expressionProperties: {
            }
          },
          {
            className: 'col-12',
            key: 'mail',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Author Mail',
            },
            expressionProperties: {
            }
          }
        ]
      }
    ]
  };