import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT } from "src/app/formly/formly.config";

export function AccountDetailFields(): FormlyFieldConfig[] {
    return [
        {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-6',
                key: 'libraryCardInfo',
                type: 'select',
                templateOptions: {
                  label: 'Library Card Info',
                  required: true,
                },
              },
              {
                className: 'col-6',
                key: 'userName',
                type: 'input',
                templateOptions: {
                  label: 'User Name',
                  required: true,
                },
              },
            ],
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-6',
                key: 'email',
                type: 'input',
                templateOptions: {
                  type: 'email',
                  label: 'Email',
                  required: true,
                },
              },
              {
                className: 'col-6',
                key: 'password',
                type: 'input',
                templateOptions: {
                  label: 'Password',
                  required: true,
                },
              },
            ],
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-6',
                key: 'status',
                type: 'select',
                templateOptions: {
                  label: 'Status',
                  required: true,
                  options: [
                    { value: 1, label: 'Active' },
                    { value: 2, label: 'Deactivated' },
                  ],
                },
              },
            ],
        },
    ]
  };