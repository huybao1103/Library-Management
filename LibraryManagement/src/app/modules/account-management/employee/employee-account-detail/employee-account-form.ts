import { FormlyFieldConfig } from "@ngx-formly/core";
import { LibraryCardStatus } from "src/app/enums/library-card-status";
import { KeyFilterType } from "src/app/enums/p-key-filter.type";
import { FORMLY_CHECKBOX, FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function EmployeeAccountField(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Employee Name',
              required: true,
            }
          },
          {
            className: 'col-6',
            key: 'citizenId',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Citizen ID',
              required: true
            },
          },
          {
            className: 'col-6',
            key: 'birthDate',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'Birth Date',
              showIcon: true,
              showButtonBar: true
            },
          },
          {
            className: 'col-6',
            key: 'joinDate',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'Joining Date',
              showIcon: true,
              showButtonBar: true
            },
          },
          {
            className: 'col-6',
            key: 'roleId',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Role',
              required: true,
            },
            expressions: {
              'props.options': "formState.optionList.roles"
            }
          },
          {
            className: 'col-6',
            key: 'email',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Email',
              required: true
            }
          },
          {
            className: 'col-6',
            key: 'password',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Password',
              required: true,
              type: 'password',
              showIcon: true
            },
          },
        ]
      }
    ]
  };