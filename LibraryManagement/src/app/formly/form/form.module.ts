import { NgModule } from "@angular/core";
import { InputTextModule } from "./input-text/input-text.module";
import { NgSelectComponent } from './ng-select/ng-select.component';
import { NgSelectItemModule  } from "./ng-select/ng-select.module";
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckBoxModule } from "./checkbox/checkbox.module";

@NgModule({
    imports: [
      InputTextModule,
      NgSelectItemModule,
      CheckBoxModule
    ],
    declarations: [
    ]
  })
  export class FormsModule { }