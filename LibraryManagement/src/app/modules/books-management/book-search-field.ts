import { FormlyFieldConfig } from "@ngx-formly/core";
import { KeyFilterType } from "src/app/enums/p-key-filter.type";
import { FORMLY_CHECKBOX, FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function BookSearchFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Book Name',
            }
          },
          {
            className: 'col-4',
            key: 'categories',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Categories',
              multiple: true,
              searchable: true
            },
            expressions: {
              'props.options': "formState.optionList.categories"
            }
          },
          {
            className: 'col-4',
            key: 'authors',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Authors',
              multiple: true,
              searchable: true
            },
            expressions: {
              'props.options': "formState.optionList.authors"
            }
          }
        ]
      }
    ]
  };