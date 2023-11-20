import { AbstractControl, FormControl } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FORMLY_INPUT, FORMLY_INPUT_PASSWORD, FORMLY_SELECT } from "src/app/formly/formly.config";

export function RegisterFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'id',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Student ID (Card ID)',
              required: true
            }
          },
          {
            className: 'col-6',
            key: 'clazz',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Class',
              required: true,
            },
          },
          {
            className: 'col-12',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Name',
              required: true,
            },
          },
          {
            className: 'col-12',
            key: 'email',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Email',
              required: true,
              suffix: '@st.huflit.edu.vn'
            },
            validators: {
              email: {
                expression: (c: AbstractControl) => {
                    return c.value ? c.value.endsWith('@st.huflit.edu.vn') : false;
                },
                message: (error: any, field: FormlyFieldConfig) => 'Email must be your student email.',
              }
            }
          },
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
            validators: {
              password: {
                expression: (c: AbstractControl) => {
                    return c.value ? c.value.endsWith('@st.huflit.edu.vn') : false;
                },
                message: (error: any, field: FormlyFieldConfig) => 'Email must be your student email.',
              }
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
          },
        ]
      }
    ]
  };

  function gmailValidator(control: FormControl) {
    if (!control.value.endsWith('@gmail.com')) {
      return {
        email: {
          valid: false
        }
      };
    }
  
    return null;
  }