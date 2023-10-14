import { FormlyFieldConfig } from "@ngx-formly/core";
import { LibraryCardStatus } from "src/app/enums/library-card-status";
import { FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function BorrowHistoryInfoField(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'bookId',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Book',
              required: true,
            },
            expressions: {
                'props.options': "formState.optionList.book",
                'props.change': (field: FormlyFieldConfig) => {
                    if(field.key === 'bookId') {
                        return field.options?.formState.onBookSelected(field.formControl?.value)
                    }
                }
            }
          },
          {
            className: 'col-6',
            key: 'bookChapterId',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Chapter',
              required: true,
            },
            expressions: {
                'props.options': "formState.optionList.chapter"
            }
          },
          {
            className: 'col-6',
            key: 'borrowDate',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'Borrow Date',
              required: true
            },
          },
          {
            className: 'col-6',
            key: 'endDate',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'End Date',
              required: true
            },
          },
          {
            className: 'col-6',
            key: 'status',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Status',
              required: true,
              options: [
                { label: LibraryCardStatus[LibraryCardStatus.Active], value: LibraryCardStatus.Active },
                { label: LibraryCardStatus[LibraryCardStatus.Inactive], value: LibraryCardStatus.Inactive },
                { label: LibraryCardStatus[LibraryCardStatus.Expired], value: LibraryCardStatus.Expired },
              ]
            },
          },
        ]
      }
    ]
  };