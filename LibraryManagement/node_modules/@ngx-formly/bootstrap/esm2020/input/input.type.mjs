import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
export class FormlyFieldInput extends FieldType {
    get type() {
        return this.props.type || 'text';
    }
}
FormlyFieldInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldInput, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldInput.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldInput, selector: "formly-field-input", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <input
        *ngIf="type !== 'number'; else numberTmp"
        [type]="type"
        [formControl]="formControl"
        class="form-control"
        [formlyAttributes]="field"
        [class.is-invalid]="showError"
      />
      <ng-template #numberTmp>
        <input
          type="number"
          [formControl]="formControl"
          class="form-control"
          [formlyAttributes]="field"
          [class.is-invalid]="showError"
        />
      </ng-template>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i2.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldInput, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-input',
                    template: `
    <ng-template #fieldTypeTemplate>
      <input
        *ngIf="type !== 'number'; else numberTmp"
        [type]="type"
        [formControl]="formControl"
        class="form-control"
        [formlyAttributes]="field"
        [class.is-invalid]="showError"
      />
      <ng-template #numberTmp>
        <input
          type="number"
          [formControl]="formControl"
          class="form-control"
          [formlyAttributes]="field"
          [class.is-invalid]="showError"
        />
      </ng-template>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvaW5wdXQvc3JjL2lucHV0LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDOzs7OztBQWlDL0UsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFNBQXNDO0lBQzFFLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO0lBQ25DLENBQUM7OzhHQUhVLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLGlGQXZCakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzRGQUdVLGdCQUFnQjtrQkF6QjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGVDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZvcm1seUZpZWxkUHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9ib290c3RyYXAvZm9ybS1maWVsZCc7XG5cbmludGVyZmFjZSBJbnB1dFByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seUlucHV0RmllbGRDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxJbnB1dFByb3BzPiB7XG4gIHR5cGU6ICdpbnB1dCcgfCBUeXBlPEZvcm1seUZpZWxkSW5wdXQ+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtaW5wdXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZmllbGRUeXBlVGVtcGxhdGU+XG4gICAgICA8aW5wdXRcbiAgICAgICAgKm5nSWY9XCJ0eXBlICE9PSAnbnVtYmVyJzsgZWxzZSBudW1iZXJUbXBcIlxuICAgICAgICBbdHlwZV09XCJ0eXBlXCJcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICAgIFtjbGFzcy5pcy1pbnZhbGlkXT1cInNob3dFcnJvclwiXG4gICAgICAvPlxuICAgICAgPG5nLXRlbXBsYXRlICNudW1iZXJUbXA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgICAgICBbY2xhc3MuaXMtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICAvPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGRJbnB1dCBleHRlbmRzIEZpZWxkVHlwZTxGaWVsZFR5cGVDb25maWc8SW5wdXRQcm9wcz4+IHtcbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMudHlwZSB8fCAndGV4dCc7XG4gIH1cbn1cbiJdfQ==