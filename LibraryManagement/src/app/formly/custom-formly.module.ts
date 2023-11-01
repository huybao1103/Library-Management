import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyFieldInput } from "./type/input.type";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { InputTextModule } from "./form/input-text/input-text.module";
import { FORMLY_CONFIG } from "./formly.config";
import { FormlyFieldNgSelect } from "./type/ng-select.type";
import { NgSelectItemModule} from "./form/ng-select/ng-select.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormlyFieldCheckbox } from "./type/checkbox.type";
import { CheckBoxModule } from "./form/checkbox/checkbox.module";
import { FormlyFieldDateTime } from "./type/datetime-picker.type";
import { DatatimePickerModule } from "./form/datetime-picker/datatime-picker.module";
import { FormlyFieldInputPassword } from "./type/input-password.type";
import { InputPasswordModule } from "./form/input-password/input-password.module";

@NgModule({
    declarations: [
      FormlyFieldInput,
      FormlyFieldNgSelect,
      FormlyFieldCheckbox,
      FormlyFieldDateTime,
      FormlyFieldInputPassword
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      FormlyBootstrapModule,
      InputTextModule,
      FormlyModule.forChild(FORMLY_CONFIG),
      NgSelectItemModule,
      NgSelectModule,
      CheckBoxModule,
      DatatimePickerModule,
      InputPasswordModule
    ]
  })
  
  export class CustomFormlyModule { }