import { ConfigOption } from "@ngx-formly/core";
import { FormlyFieldInput } from "./type/input.type";
import { FormlyFieldNgSelect } from "./type/ng-select.type";
import { FormlyFieldCheckbox } from "./type/checkbox.type";
import { FormlyFieldDateTime } from "./type/datetime-picker.type";

export const FORMLY_INPUT = {
    name: 'input-text',
    component: FormlyFieldInput,
    wrappers: ['form-field']
};

export const FORMLY_SELECT = {
  name: 'select',
  component: FormlyFieldNgSelect,
  wrappers: ['form-field']
};

export const FORMLY_CHECKBOX = {
  name: 'check-box-control',
  component: FormlyFieldCheckbox,
  wrappers: ['form-field']
};

export const FORMLY_DATETIME_PICKER = {
  name: 'date-time',
  component: FormlyFieldDateTime,
  wrappers: ['form-field']
};

export const FORMLY_CONFIG: ConfigOption = {
    types: [
      FORMLY_INPUT,
      FORMLY_SELECT,
      FORMLY_CHECKBOX,
      FORMLY_DATETIME_PICKER
    ],
    validators: [],
    validationMessages: [],
  };