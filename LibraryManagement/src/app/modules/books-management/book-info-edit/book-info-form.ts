import { FormlyFieldConfig } from "@ngx-formly/core";
import { KeyFilterType } from "src/app/enums/p-key-filter.type";
import { FORMLY_CHECKBOX, FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function BookDetailFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Book Name',
              required: true,
            }
          },
          {
            className: 'col-6',
            key: 'categories',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Categories',
              multiple: true,
              required: true
            },
            expressions: {
              'props.options': "formState.optionList.categories"
            }
          },
          {
            className: 'col-6',
            key: 'inputDay',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'Input Day',
              showIcon: true,
              showButtonBar: true
            },
          },
          {
            className: 'col-6',
            key: 'publishYear',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Publish Year',
              keyFilter: KeyFilterType.int
            },
            expressions: {
              'props.options': "formState.optionList.author"
            }
          }
        ]
      }
    ]
  };