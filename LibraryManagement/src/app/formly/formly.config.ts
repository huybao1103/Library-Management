import { ConfigOption } from "@ngx-formly/core";
import { FormlyFieldInput } from "./type/input.type";

export const FORMLY_INPUT = {
    name: 'input-text',
    component: FormlyFieldInput,
    wrappers: ['form-field']
};

export const FORMLY_CONFIG: ConfigOption = {
    types: [
      FORMLY_INPUT,
    ],
    validators: [],
    validationMessages: [],
  };