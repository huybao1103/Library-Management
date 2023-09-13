import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

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
              required: true
            },
            expressionProperties: {
            }
          },
          {
            className: 'col-6',
            key: 'mail',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Author Mail',
              disabled: true
            },
            expressionProperties: {
            }
          },
          {
            className: 'col-6',
            key: 'mail',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Author Mail',
              searchable: true,
            },
            expressions: {
              'props.options': "formState.optionList.author"
            }
          }
        ]
      }
    ]
  };