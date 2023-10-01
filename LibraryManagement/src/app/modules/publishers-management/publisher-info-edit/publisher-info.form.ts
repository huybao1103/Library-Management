import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT } from "src/app/formly/formly.config";

export function PublisherDetailFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Publisher Name',
              required: true
            }
          },
          {
            className: 'col-6',
            key: 'phone',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Publisher Phone',
            },
            expressionProperties: {
            }
          },
          {
            className: 'col-6',
            key: 'mail',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Publisher Mail'
            },
            expressionProperties: {
            }
          },
          {
            className: 'col-6',
            key: 'address',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Publisher Address'
            },
            expressionProperties: {
            }
          }
        ]
      }
    ]
  };