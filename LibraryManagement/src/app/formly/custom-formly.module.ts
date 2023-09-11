import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyFieldInput } from "./type/input.type";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { InputTextModule } from "./form/input-text/input-text.module";
import { FORMLY_CONFIG } from "./formly.config";

@NgModule({
    declarations: [
      FormlyFieldInput,
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      FormlyBootstrapModule,
      InputTextModule,
      FormlyModule.forChild(FORMLY_CONFIG),
    ]
  })
  
  export class CustomFormlyModule { }