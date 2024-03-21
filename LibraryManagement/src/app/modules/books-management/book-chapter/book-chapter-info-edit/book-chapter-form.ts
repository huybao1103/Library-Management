import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from "@ngx-formly/core";
import { BookChapterStatus } from "src/app/enums/book-chapter-status";
import { KeyFilterType } from "src/app/enums/p-key-filter.type";
import { FORMLY_CHECKBOX, FORMLY_DATETIME_PICKER, FORMLY_INPUT, FORMLY_SELECT } from "src/app/formly/formly.config";

export function BookChapterDetailFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'chapter',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Chapter',
              required: true,
              keyFilter: KeyFilterType.int
            }
          },
          {
            className: 'col-6',
            key: 'identifyId',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Identify ID',
              required: true,
              disabled: true,
            },
          },
          {
            className: 'col-6',
            key: 'quantity',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Quantity',
              required: true,
              keyFilter: KeyFilterType.int
            },
          },
          {
            className: 'col-12',
            key: 'description',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Description',
            }
          },
        ]
      }
    ]
  };