import { AbstractControl } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT, FORMLY_INPUT_PASSWORD, FORMLY_SELECT } from "src/app/formly/formly.config";

export function AccountDetailFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'libraryCardId',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Library Card',
              required: true,
            },
            expressions: {
              'props.options': "formState.optionList.librayCardList",
              'props.readonly': "formState.isEditting"
            }
          },
          {
            className: 'col-6',
            key: 'email',
            type: FORMLY_INPUT.name,
            templateOptions: {
              type: 'email',
              label: 'Email',
              required: true,
              suffix: '@st.huflit.edu.vn'
            },
            validators: {
              email: {
                expression: (c: AbstractControl) => {
                    return c.value ? c.value.endsWith('@st.huflit.edu.vn') : false;
                },
                message: (error: any, field: FormlyFieldConfig) => 'Email must be a student email.',
              }
            }
          },
        ],
      },
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
            },
            expressions: {
              'props.required': "!formState.isEditting"
            }
          },
          // {
          //   className: 'col-6',
          //   key: 'status',
          //   type: 'select',
          //   templateOptions: {
          //     label: 'Status',
          //     required: true,
          //     options: [
          //       { value: 1, label: 'Active' },
          //       { value: 2, label: 'Deactivated' },
          //     ],
          //   },
          // },
        ],
      },
    ]
  };