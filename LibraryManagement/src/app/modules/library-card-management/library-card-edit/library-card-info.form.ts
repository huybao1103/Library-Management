import { FormlyFieldConfig } from "@ngx-formly/core";
import { LibraryCardStatus } from "src/app/enums/library-card-status";
import { KeyFilterType } from "src/app/enums/p-key-filter.type";
import { FORMLY_CHECKBOX, FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function LibraryCardInfoField(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'studentId',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Card ID (Student ID)',
              required: true,
            }
          },
          {
            className: 'col-6',
            key: 'name',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Student Name',
              required: true,
            }
          },
          {
            className: 'col-6',
            key: 'class',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Class',
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
          {
            className: 'col-6',
            key: 'expiryDate',
            type: FORMLY_DATETIME_PICKER.name,
            templateOptions: {
              label: 'Expiry Date',
              showIcon: true,
              showButtonBar: true
            },
          },
        ]
      }
    ]
  };