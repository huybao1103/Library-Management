import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
export class FormlyFieldCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                indeterminate: true,
                hideLabel: true,
                formCheck: 'default',
            },
        };
    }
}
FormlyFieldCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldCheckbox, selector: "formly-field-checkbox", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <div
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [class.is-invalid]="showError"
          class="form-check-input"
          [class.position-static]="props.formCheck === 'nolabel'"
          [indeterminate]="props.indeterminate && formControl.value == null"
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
        <label *ngIf="props.formCheck !== 'nolabel'" [for]="id" class="form-check-label">
          {{ props.label }}
          <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
        </label>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-checkbox',
                    template: `
    <ng-template #fieldTypeTemplate>
      <div
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [class.is-invalid]="showError"
          class="form-check-input"
          [class.position-static]="props.formCheck === 'nolabel'"
          [indeterminate]="props.indeterminate && formControl.value == null"
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
        <label *ngIf="props.formCheck !== 'nolabel'" [for]="id" class="form-check-label">
          {{ props.label }}
          <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
        </label>
      </div>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvY2hlY2tib3gvc3JjL2NoZWNrYm94LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDOzs7OztBQXdDL0UsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFNBQXlDO0lBN0JsRjs7UUE4QlcsbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFNBQVMsRUFBRSxTQUFrQjthQUM5QjtTQUNGLENBQUM7S0FDSDs7aUhBUlksbUJBQW1CO3FHQUFuQixtQkFBbUIsb0ZBM0JwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JUOzRGQUdVLG1CQUFtQjtrQkE3Qi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3QlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvYm9vdHN0cmFwL2Zvcm0tZmllbGQnO1xuXG5pbnRlcmZhY2UgQ2hlY2tib3hQcm9wcyBleHRlbmRzIEZvcm1seUZpZWxkUHJvcHMge1xuICBmb3JtQ2hlY2s/OiAnZGVmYXVsdCcgfCAnaW5saW5lJyB8ICdzd2l0Y2gnIHwgJ2lubGluZS1zd2l0Y2gnIHwgJ25vbGFiZWwnO1xuICBpbmRldGVybWluYXRlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlDaGVja2JveEZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8Q2hlY2tib3hQcm9wcz4ge1xuICB0eXBlOiAnY2hlY2tib3gnIHwgVHlwZTxGb3JtbHlGaWVsZENoZWNrYm94Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2ZpZWxkVHlwZVRlbXBsYXRlPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImZvcm0tY2hlY2tcIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ2Zvcm0tY2hlY2staW5saW5lJzogcHJvcHMuZm9ybUNoZWNrID09PSAnaW5saW5lJyB8fCBwcm9wcy5mb3JtQ2hlY2sgPT09ICdpbmxpbmUtc3dpdGNoJyxcbiAgICAgICAgICAnZm9ybS1zd2l0Y2gnOiBwcm9wcy5mb3JtQ2hlY2sgPT09ICdzd2l0Y2gnIHx8IHByb3BzLmZvcm1DaGVjayA9PT0gJ2lubGluZS1zd2l0Y2gnXG4gICAgICAgIH1cIlxuICAgICAgPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIFtjbGFzcy5pcy1pbnZhbGlkXT1cInNob3dFcnJvclwiXG4gICAgICAgICAgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0XCJcbiAgICAgICAgICBbY2xhc3MucG9zaXRpb24tc3RhdGljXT1cInByb3BzLmZvcm1DaGVjayA9PT0gJ25vbGFiZWwnXCJcbiAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJwcm9wcy5pbmRldGVybWluYXRlICYmIGZvcm1Db250cm9sLnZhbHVlID09IG51bGxcIlxuICAgICAgICAgIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiXG4gICAgICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJwcm9wcy5mb3JtQ2hlY2sgIT09ICdub2xhYmVsJ1wiIFtmb3JdPVwiaWRcIiBjbGFzcz1cImZvcm0tY2hlY2stbGFiZWxcIj5cbiAgICAgICAgICB7eyBwcm9wcy5sYWJlbCB9fVxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwicHJvcHMucmVxdWlyZWQgJiYgcHJvcHMuaGlkZVJlcXVpcmVkTWFya2VyICE9PSB0cnVlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+Kjwvc3Bhbj5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZENoZWNrYm94IGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxDaGVja2JveFByb3BzPj4ge1xuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcbiAgICAgIGhpZGVMYWJlbDogdHJ1ZSxcbiAgICAgIGZvcm1DaGVjazogJ2RlZmF1bHQnIGFzIGNvbnN0LFxuICAgIH0sXG4gIH07XG59XG4iXX0=