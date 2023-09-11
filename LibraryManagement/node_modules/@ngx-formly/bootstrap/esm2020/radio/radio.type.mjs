import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@ngx-formly/core/select";
export class FormlyFieldRadio extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                formCheck: 'default',
            },
        };
    }
    get disabledControl() {
        return new FormControl({ value: this.formControl.value, disabled: true });
    }
}
FormlyFieldRadio.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldRadio.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldRadio, selector: "formly-field-radio", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [class.form-check-inline]="props.formCheck === 'inline'"
      >
        <input
          type="radio"
          [id]="id + '_' + i"
          class="form-check-input"
          [name]="field.name || id"
          [class.is-invalid]="showError"
          [attr.value]="option.value"
          [value]="option.value"
          [formControl]="option.disabled ? disabledControl : formControl"
          [formlyAttributes]="field"
        />
        <label class="form-check-label" [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], pipes: { "async": i1.AsyncPipe, "formlySelectOptions": i4.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-radio',
                    template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [class.form-check-inline]="props.formCheck === 'inline'"
      >
        <input
          type="radio"
          [id]="id + '_' + i"
          class="form-check-input"
          [name]="field.name || id"
          [class.is-invalid]="showError"
          [attr.value]="option.value"
          [value]="option.value"
          [formControl]="option.disabled ? disabledControl : formControl"
          [formlyAttributes]="field"
        />
        <label class="form-check-label" [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8udHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvcmFkaW8vc3JjL3JhZGlvLnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBc0M3QyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsU0FBc0M7SUE1QjVFOztRQTZCVyxtQkFBYyxHQUFHO1lBQ3hCLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsU0FBa0I7YUFDOUI7U0FDRixDQUFDO0tBS0g7SUFIQyxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs4R0FUVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQixpRkExQmpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDs0RkFHVSxnQkFBZ0I7a0JBNUI1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvYm9vdHN0cmFwL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmludGVyZmFjZSBSYWRpb1Byb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7XG4gIGZvcm1DaGVjaz86ICdkZWZhdWx0JyB8ICdpbmxpbmUnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seVJhZGlvRmllbGRDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxSYWRpb1Byb3BzPiB7XG4gIHR5cGU6ICdyYWRpbycgfCBUeXBlPEZvcm1seUZpZWxkUmFkaW8+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtcmFkaW8nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZmllbGRUeXBlVGVtcGxhdGU+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnMgOiBmaWVsZCB8IGFzeW5jOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNoZWNrXCJcbiAgICAgICAgW2NsYXNzLmZvcm0tY2hlY2staW5saW5lXT1cInByb3BzLmZvcm1DaGVjayA9PT0gJ2lubGluZSdcIlxuICAgICAgPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIFtpZF09XCJpZCArICdfJyArIGlcIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dFwiXG4gICAgICAgICAgW25hbWVdPVwiZmllbGQubmFtZSB8fCBpZFwiXG4gICAgICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgICBbYXR0ci52YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJvcHRpb24uZGlzYWJsZWQgPyBkaXNhYmxlZENvbnRyb2wgOiBmb3JtQ29udHJvbFwiXG4gICAgICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCIgW2Zvcl09XCJpZCArICdfJyArIGlcIj5cbiAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfX1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZFJhZGlvIGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxSYWRpb1Byb3BzPj4ge1xuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgZm9ybUNoZWNrOiAnZGVmYXVsdCcgYXMgY29uc3QsXG4gICAgfSxcbiAgfTtcblxuICBnZXQgZGlzYWJsZWRDb250cm9sKCkge1xuICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2woeyB2YWx1ZTogdGhpcy5mb3JtQ29udHJvbC52YWx1ZSwgZGlzYWJsZWQ6IHRydWUgfSk7XG4gIH1cbn1cbiJdfQ==