import { FormlyFieldConfig } from "@ngx-formly/core";
import { BookInfoEditComponent } from "./book-info.edit.component";
import { FORMLY_INPUT } from "src/app/formly/formly.config";

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
              label: 'Name',
              required: true
            }
          },
          {
            className: 'col-6',
            key: 'locationId',
            type: FORMLY_INPUT.name,
            templateOptions: {
              label: 'Location',
              disabled: true
            },
            expressionProperties: {
            }
          }
        ]
      }
    ]
  };