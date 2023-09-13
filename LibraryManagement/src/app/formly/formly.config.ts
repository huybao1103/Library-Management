import { ConfigOption } from "@ngx-formly/core";
import { FormlyFieldInput } from "./type/input.type";
import { FormlyFieldNgSelect } from "./type/ng-select.type";

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

export const FORMLY_CONFIG: ConfigOption = {
    types: [
      FORMLY_INPUT,
      FORMLY_SELECT
    ],
    validators: [],
    validationMessages: [],
  };