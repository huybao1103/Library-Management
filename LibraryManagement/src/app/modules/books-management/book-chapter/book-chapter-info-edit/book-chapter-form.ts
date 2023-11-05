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
            }
          },
          {
            className: 'col-6',
            key: 'description',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Description',
              required: true,
            }
          },
          {
            className: 'col-6',
            key: 'status',
            type: FORMLY_SELECT.name,
            templateOptions: {
              label: 'Status',
              required: true,
              options: [
                {label: BookChapterStatus[BookChapterStatus.Free], value: BookChapterStatus.Free},
                {label: BookChapterStatus[BookChapterStatus.Borrowed], value: BookChapterStatus.Borrowed},
                {label: BookChapterStatus[BookChapterStatus.Destroyed], value: BookChapterStatus.Destroyed},
                {label: BookChapterStatus[BookChapterStatus.Lost], value: BookChapterStatus.Lost},
              ]
            },
          },
        ]
      }
    ]
  };