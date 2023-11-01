import { FormlyFieldConfig } from "@ngx-formly/core";
import { KeyFilterType } from "src/app/enums/p-key-filter.type";
import { FORMLY_CHECKBOX, FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function EmployeeSearch(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Employee Name',
            }
          },
          {
            className: 'col-2',
            key: 'phone',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Phone',
              multiple: true,
              searchable: true
            }
          },
          {
            className: 'col-2',
            key: 'mail',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Mail',
              multiple: true,
              searchable: true
            }
          },
          {
            className: 'col-4',
            key: 'role',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Role',
              multiple: true,
              searchable: true
            },
            expressions: {
              'props.options': "formState.optionList.roles"
            }
          }
        ]
      }
    ]
  };