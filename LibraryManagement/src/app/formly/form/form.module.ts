import { NgModule } from "@angular/core";
import { InputTextModule } from "./input-text/input-text.module";
import { NgSelectComponent } from './ng-select/ng-select.component';
import { NgSelectItemModule  } from "./ng-select/ng-select.module";

@NgModule({
    imports: [
      InputTextModule,
      NgSelectItemModule 
    ],
    declarations: []
  })
  export class FormsModule { }