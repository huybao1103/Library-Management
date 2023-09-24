import { FormlyFieldConfig } from "@ngx-formly/core";
import { KeyFilterType } from "src/app/enums/p-key-filter.type";
import { FORMLY_INPUT } from "src/app/formly/formly.config";

export function CategorysDetailFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Category Name',
              required: true,
              keyFilter: KeyFilterType.text
            }
          },
          {
            className: 'col-6',
            key: 'description',
            type: FORMLY_INPUT.name,
            templateOptions: {
            label: 'Description',
            },
            expressionProperties: {
            }
          }
        ]
      }
    ]
  };