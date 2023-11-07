import { FormlyFieldConfig } from "@ngx-formly/core";
import { LibraryCardStatus } from "src/app/enums/library-card-status";
import { FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function BorrowRequestInfoField(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'borrowDate',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'Borrow Date',
              required: true
            },
            expressions: {
              'props.change': (field: FormlyFieldConfig) => {
                if(field.key === 'borrowDate') {
                    return field.options?.formState.onBorrowDateSelect()
                }
              }
            }
          },
          {
            className: 'col-6',
            key: 'endDate',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'End Date',
              required: true,
            },
            expressions: {
              'props.maxDate': "formState.maxDate",
              'props.minDate': "formState.minDate",
            }
          },
        ]
      }
    ]
  };